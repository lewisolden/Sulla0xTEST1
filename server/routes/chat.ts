import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Message schema validation
const chatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  context: z.object({
    currentPath: z.string(),
    previousMessages: z.array(z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
      timestamp: z.string(),
      links: z.array(z.object({
        text: z.string(),
        url: z.string()
      })).optional()
    })),
    userProgress: z.record(z.unknown()).optional()
  })
});

// Main chat endpoint
router.post("/send", async (req, res) => {
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

    const { message, context } = result.data;

    // Check API key
    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();
    if (!apiKey) {
      console.error('[Chat] Missing Perplexity API key');
      return res.status(500).json({ error: 'API configuration error' });
    }

    if (!apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/)) {
      console.error('[Chat] Invalid API key format');
      return res.status(500).json({ error: 'Invalid API key configuration' });
    }

    // Prepare system message based on context
    let systemMessage = "You are an AI tutor specialized in blockchain and cryptocurrency education. ";

    // Add context about current location in the course
    if (context.currentPath) {
      systemMessage += `The user is currently viewing: ${context.currentPath}. `;
    }

    systemMessage += "Focus on providing accurate, educational responses related to the current course material. Keep responses clear, concise, and engaging. Provide practical examples when explaining complex blockchain and cryptocurrency concepts. Use analogies when helpful. Avoid technical jargon unless specifically asked about technical details.";

    // Get previous conversation context
    const previousConversation = context.previousMessages
      ?.map(msg => ({
        role: msg.role,
        content: msg.content
      })) || [];

    // Prepare the chat request
    const requestBody = {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        ...previousConversation,
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

    console.log('[Chat] Making request to Perplexity API with body:', JSON.stringify(requestBody));
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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
        links: generateContextualLinks(context.currentPath)
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

function generateContextualLinks(currentPath: string) {
  const baseLinks = [
    { text: "View Course Materials", url: "/curriculum" },
    { text: "Check Learning Resources", url: "/library" }
  ];

  // Add context-specific links based on current path
  if (currentPath.includes('/ai/')) {
    baseLinks.push({ text: "Explore AI Modules", url: "/ai" });
  } else if (currentPath.includes('/defi/')) {
    baseLinks.push({ text: "DeFi Learning Path", url: "/defi/module1" });
  } else if (currentPath.includes('/modules/')) {
    baseLinks.push({ text: "Module Overview", url: "/modules" });
  }

  return baseLinks;
}

export default router;