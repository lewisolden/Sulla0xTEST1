import { Router } from 'express';
import { z } from 'zod';
import { db } from '@db';
import { eq } from 'drizzle-orm';
import { courseEnrollments } from '@db/schema';

declare module 'express-session' {
  interface Session {
    userId?: number;
  }
}

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

router.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = chatSchema.parse(req.body);

    // Get user progress if authenticated
    let userProgress: UserProgress | null = null;
    if (req.session.userId) {
      const enrollments = await db
        .select()
        .from(courseEnrollments)
        .where(eq(courseEnrollments.userId, req.session.userId));

      // Calculate completed modules and current progress
      userProgress = {
        completedModules: enrollments
          .filter(e => e.progress >= 100)
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
    }

    let systemMessage = `You are Sensei, Sulla's friendly AI learning companion. Your role is to provide clear, concise guidance while maintaining a warm and encouraging tone. You're an expert in blockchain and AI, focusing exclusively on Sulla's curriculum.

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

Current context: `;

    // Add detailed context based on the current section
    if (context.includes('/ai/')) {
      systemMessage += `You're assisting with our AI curriculum. Reference only these specific modules:
- AI Foundations: Basic concepts and terminology
- Machine Learning Fundamentals: Core ML principles
- Neural Networks: Deep learning basics
- AI Applications: Real-world use cases

Direct students to specific sections and exercises within these modules.`;
    } else if (context.includes('/blockchain/')) {
      systemMessage += `You're assisting with our Blockchain curriculum. Reference only these specific modules:
- Blockchain Foundations: Core concepts and architecture
- Bitcoin Deep Dive: Bitcoin protocol and mechanics
- Ethereum & Smart Contracts: Smart contract development
- Advanced Topics: DeFi, NFTs, and emerging trends

Guide students to relevant sections and practical exercises within these modules.`;
    }

    systemMessage += `

Response guidelines:
1. Be friendly and encouraging: "Great question!" or "I'd be happy to help!"
2. Give direct, specific answers referencing Sulla's content
3. Point to exact module sections: "Check Module 2.3: Smart Contracts"
4. Recommend relevant exercises: "Try the practical exercise in Section 3.2"
5. Include quick links using [LINK] tags: [LINK]module-name|/path/to/module[/LINK]
6. Keep responses brief but helpful

Remember: You're a friendly guide helping students navigate Sulla's learning platform!

When suggesting content, wrap links in [LINK] tags:
Example: "Check out our [LINK]Smart Contracts module|/modules/smart-contracts[/LINK]"`;

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
            content: systemMessage
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
      console.error('Perplexity API error:', await response.text());
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
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
    console.error('Chat error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid request format',
        details: error.errors
      });
    }
    res.status(500).json({ 
      error: 'I apologize, but I seem to be having trouble right now. Please try asking your question again!',
      friendly: true 
    });
  }
});

export default router;