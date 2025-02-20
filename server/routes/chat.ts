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

    // Validate API key format
    const apiKey = process.env.PERPLEXITY_API_KEY.trim();
    const keyMatch = apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/);
    if (!keyMatch) {
      console.error('[Chat] Invalid API key format:', apiKey.slice(0, 7) + '...');
      throw new Error('API key format error');
    }

    // Make the API request with timeout
    console.log('[Chat] Sending request to Perplexity API');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const requestBody = {
        model: 'llama-2-70b-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 0.9,
      };

      console.log('[Chat] Request payload:', JSON.stringify(requestBody));

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      console.log('[Chat] Raw API response:', responseText);

      if (!response.ok) {
        console.error('[Chat] Perplexity API error:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        });
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(responseText);
      console.log('[Chat] Parsed API response:', data);

      res.json({ 
        response: data.choices[0].message.content,
        userProgress: userProgress 
      });
    } catch (apiError) {
      console.error('[Chat] API request error:', apiError);
      throw apiError;
    }
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