import { Router } from 'express';
import { z } from 'zod';
import { db } from "@db";
import { eq, and } from 'drizzle-orm';
import { courseEnrollments } from "@db/schema";

const router = Router();

// Message schema validation
const chatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  courseId: z.number().optional(),
  context: z.string().optional()
});

// Test endpoint for Perplexity API
router.get("/test", async (req, res) => {
  console.log('[Chat Test] Received request to /test');
  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('[Chat Test] Missing Perplexity API key');
      return res.status(500).json({ error: 'API key configuration error' });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY.trim();
    if (!apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/)) {
      console.error('[Chat Test] Invalid API key format');
      return res.status(500).json({ error: 'Invalid API key format' });
    }

    const requestBody = {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: "Be precise and concise."
        },
        {
          role: "user",
          content: "Hello, are you working?"
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 0.9,
      return_images: false,
      return_related_questions: false,
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1
    };

    console.log('[Chat Test] Making request to Perplexity API');
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('[Chat Test] Response status:', response.status);
    console.log('[Chat Test] Raw response:', responseText);

    if (!response.ok) {
      console.error('[Chat Test] API error:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${responseText}`);
    }

    try {
      const data = JSON.parse(responseText);
      console.log('[Chat Test] Parsed API response:', data);
      res.json({ success: true, response: data });
    } catch (parseError) {
      console.error('[Chat Test] JSON parse error:', parseError);
      throw new Error('Failed to parse API response');
    }

  } catch (error) {
    console.error('[Chat Test] Error:', error);
    res.status(500).json({ 
      error: 'Chat test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Main chat endpoint
router.post("/send", async (req, res) => {
  // Check authentication
  if (!req.isAuthenticated()) {
    console.error('[Chat] Unauthenticated request');
    return res.status(401).json({ error: "Not authenticated - Please log in" });
  }

  const userId = req.user?.id;
  if (!userId) {
    console.error('[Chat] No user ID in authenticated session');
    return res.status(401).json({ error: "Invalid session" });
  }

  console.log('[Chat] Received message:', req.body);
  try {
    // Validate request body
    const result = chatMessageSchema.safeParse(req.body);
    if (!result.success) {
      console.error('[Chat] Validation error:', result.error);
      return res.status(400).json({ 
        error: 'Invalid request',
        details: result.error.errors
      });
    }

    const { message, courseId, context } = result.data;

    // Check API key
    if (!process.env.PERPLEXITY_API_KEY) {
      console.error('[Chat] Missing Perplexity API key');
      return res.status(500).json({ error: 'API configuration error' });
    }

    // If courseId is provided, verify enrollment
    if (courseId) {
      const enrollment = await db.query.courseEnrollments.findFirst({
        where: and(
          eq(courseEnrollments.userId, userId),
          eq(courseEnrollments.courseId, courseId)
        )
      });

      if (!enrollment) {
        return res.status(403).json({ error: "Not enrolled in this course" });
      }
    }

    // Prepare system message based on context
    let systemMessage = "You are an AI tutor specialized in blockchain and cryptocurrency education. ";
    if (courseId) {
      systemMessage += "Focus on providing accurate, educational responses related to the current course material. ";
    }
    systemMessage += "Keep responses clear, concise, and engaging.";

    // Prepare the chat request
    const requestBody = {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
      return_images: false,
      return_related_questions: false,
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1
    };

    if (context) {
      requestBody.messages.splice(1, 0, {
        role: "system",
        content: `Additional context: ${context}`
      });
    }

    console.log('[Chat] Making request to Perplexity API');
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat] API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[Chat] Received API response:', data);

    // Format and send response
    res.json({
      success: true,
      response: {
        message: data.choices[0].message.content,
        citations: data.citations || [],
        metadata: {
          model: data.model,
          usage: data.usage
        }
      }
    });

  } catch (error) {
    console.error('[Chat] Error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;