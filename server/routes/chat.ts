import { Router } from 'express';
import { z } from 'zod';
import { db } from "@db";
import { eq } from 'drizzle-orm';
import { courseEnrollments } from "@db/schema";

const router = Router();

const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string()
});

interface UserProgress {
  completedModules: number[];
  currentProgress: number;
  totalLearningMinutes: number;
}

router.post("/api/chat", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      console.error("[Chat] Unauthenticated request");
      return res.status(401).json({ error: "Unauthorized - Please log in" });
    }

    const userId = req.user?.id;
    if (!userId) {
      console.error("[Chat] No user ID in authenticated session");
      return res.status(401).json({ error: "Invalid session" });
    }

    const { message, context } = chatSchema.parse(req.body);
    console.log("[Chat] Received message:", { message, context });

    // Get user progress if authenticated
    let userProgress: UserProgress | null = null;
    try {
      console.log('[Chat] Fetching user progress for userId:', userId);
      const enrollments = await db
        .select()
        .from(courseEnrollments)
        .where(eq(courseEnrollments.userId, userId));

      // Calculate completed modules and current progress
      userProgress = {
        completedModules: enrollments
          .filter(e => e.progress !== null && e.progress >= 100)
          .map(e => e.courseId),
        currentProgress: enrollments.length > 0 
          ? enrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0) / enrollments.length 
          : 0,
        totalLearningMinutes: enrollments.reduce((acc, curr) => {
          const minutes = curr.lastAccessedAt 
            ? Math.floor((new Date().getTime() - new Date(curr.lastAccessedAt).getTime()) / 60000)
            : 0;
          return acc + minutes;
        }, 0)
      };
      console.log('[Chat] Calculated user progress:', userProgress);
    } catch (dbError) {
      console.error('[Chat] Database error:', dbError);
      userProgress = null;
    }

    // Check if API key exists
    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('[Chat] Missing Perplexity API key');
      throw new Error('API key configuration error');
    }

    console.log('[Chat] Sending request to Perplexity API');
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `You are Sensei, Sulla's friendly AI learning companion. Your role is to provide clear, concise guidance while maintaining a warm and encouraging tone. You're an expert in blockchain and AI, focusing exclusively on Sulla's curriculum.

Key principles:
- Be concise and clear - keep responses under 3-4 sentences when possible
- Maintain a friendly, encouraging tone
- Only reference Sulla's course materials
- Guide users to specific sections in our modules
- Encourage hands-on learning through our exercises

${userProgress ? `
User Progress Information:
- Completed Modules: ${userProgress.completedModules.join(', ')}
- Overall Progress: ${Math.round(userProgress.currentProgress)}%
- Total Learning Time: ${userProgress.totalLearningMinutes} minutes

When responding:
1. Reference completed modules to build on existing knowledge
2. Suggest next modules based on their progress
3. Encourage completion of partially finished modules
` : ''}

Current context: ${context}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 0.9,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat] Perplexity API error:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[Chat] Received response from Perplexity API');
    const aiResponse = data.choices[0].message.content;

    // Extract any links from the response
    const links = [];
    const linkRegex = /\[LINK\](.*?)\|(.*?)\[\/LINK\]/g;
    let match;
    while ((match = linkRegex.exec(aiResponse)) !== null) {
      links.push({
        text: match[1],
        url: match[2]
      });
    }

    // Clean up the response by removing the link tags
    const cleanResponse = aiResponse.replace(linkRegex, '$1');

    res.json({ 
      response: cleanResponse,
      links: links,
      userProgress: userProgress 
    });
  } catch (error) {
    console.error('[Chat] Error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid request format',
        details: error.errors
      });
    }

    // More specific error messages based on the error type
    let errorMessage = 'I apologize, but I seem to be having trouble right now. Please try asking your question again!';
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'The chat service is currently unavailable. Please try again later.';
      } else if (error.message.includes('API request failed')) {
        errorMessage = 'I\'m having trouble connecting to my knowledge base. Please try again in a moment.';
      }
    }

    res.status(500).json({ 
      error: errorMessage,
      friendly: true 
    });
  }
});

export default router;