import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Add router-level logging middleware
router.use((req, res, next) => {
  console.log('[Chat Router] Incoming request:', {
    method: req.method,
    path: req.path,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  next();
});

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

// Test endpoint for Perplexity API
router.get("/test", async (req, res) => {
  console.log('[Chat Test] Testing Perplexity API connection...');
  try {
    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();
    if (!apiKey) {
      console.error('[Chat Test] Missing Perplexity API key');
      return res.status(500).json({ error: 'API key configuration error' });
    }

    if (!apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/)) {
      console.error('[Chat Test] Invalid API key format:', apiKey.substring(0, 10) + '...');
      return res.status(500).json({ error: 'Invalid API key configuration' });
    }

    console.log('[Chat Test] API key validation passed, making test request...');

    const requestBody = {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: "You are a test response. Respond with: 'API connection successful'"
        },
        {
          role: "user",
          content: "Test connection"
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
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('[Chat Test] Parsed response:', data);

    res.json({ 
      success: true, 
      message: "API test successful",
      response: data 
    });

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
  console.log('[Chat] Received message request:', {
    message: req.body.message,
    path: req.body.context?.currentPath,
    messageCount: req.body.context?.previousMessages?.length
  });

  try {
    const result = chatMessageSchema.safeParse(req.body);
    if (!result.success) {
      console.error('[Chat] Validation error:', result.error);
      return res.status(400).json({ 
        error: 'Invalid request format',
        details: result.error.errors
      });
    }

    const { message, context } = result.data;
    const apiKey = process.env.PERPLEXITY_API_KEY?.trim();

    if (!apiKey) {
      console.error('[Chat] Missing Perplexity API key');
      return res.status(500).json({ error: 'API configuration error' });
    }

    if (!apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/)) {
      console.error('[Chat] Invalid API key format:', apiKey.substring(0, 10) + '...');
      return res.status(500).json({ error: 'Invalid API key configuration' });
    }

    let systemMessage = "You are an AI tutor specialized in blockchain and cryptocurrency education. ";
    systemMessage += `The user is currently viewing: ${context.currentPath}. `;
    systemMessage += "Focus on providing accurate, educational responses related to blockchain concepts. Be clear and concise. Use examples when explaining complex topics.";

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

    // Add previous messages if they exist, maintaining the correct alternating order
    if (context.previousMessages && context.previousMessages.length > 0) {
      const filteredMessages = context.previousMessages.slice(-4); // Keep last 4 messages
      requestBody.messages.splice(1, 0, ...filteredMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      })));
    }

    console.log('[Chat] Making API request with:', {
      model: requestBody.model,
      messageCount: requestBody.messages.length,
      systemMessage: systemMessage.substring(0, 50) + '...'
    });

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
    console.log('[Chat] Response status:', response.status);

    if (!response.ok) {
      console.error('[Chat] API error:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${responseText}`);
    }

    try {
      const data = JSON.parse(responseText);
      console.log('[Chat] Successfully parsed response:', {
        messageLength: data.choices?.[0]?.message?.content?.length || 0
      });

      res.json({
        success: true,
        response: {
          message: data.choices[0].message.content,
          links: generateContextualLinks(context.currentPath)
        }
      });
    } catch (parseError) {
      console.error('[Chat] JSON parse error:', parseError);
      throw new Error('Failed to parse API response');
    }

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