import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Add router-level logging middleware
router.use((req, res, next) => {
  console.log('[Chat Router] Incoming request:', {
    method: req.method,
    path: req.path,
    url: req.url,
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
    })).optional().default([]),
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
  console.log('[Chat] Request body:', JSON.stringify(req.body, null, 2));

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
      console.error('[Chat] Missing API key');
      return res.status(500).json({ error: 'API configuration error' });
    }

    // Construct messages array with enhanced system prompt
    const messages = [{
      role: "system",
      content: "You are an educational AI tutor specializing in blockchain and cryptocurrency education. " +
               "Provide concise, direct responses in 2-3 sentences maximum. " +
               "Always reference specific course modules when possible. " +
               `The user is currently viewing: ${context.currentPath}. ` +
               "For Ethereum topics, reference Module 3 (Ethereum/smart contracts). " +
               "For Bitcoin topics, reference Modules 1-2 (fundamentals/investment). " +
               "Keep explanations brief and direct users to course materials for details."
    }];

    // Add the current user message
    messages.push({
      role: "user",
      content: message
    });

    console.log('[Chat] Final messages array:', JSON.stringify(messages, null, 2));

    const requestBody = {
      model: "llama-3.1-sonar-small-128k-online",
      messages,
      temperature: 0.3, 
      max_tokens: 250, 
      top_p: 0.9,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1
    };

    console.log('[Chat] Making API request:', JSON.stringify(requestBody, null, 2));

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
    console.log('[Chat] Raw response:', responseText);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('[Chat] Parsed response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    res.json({
      success: true,
      response: {
        message: data.choices[0].message.content,
        links: generateContextualLinks(context.currentPath, message)
      }
    });

  } catch (error) {
    console.error('[Chat] Detailed error:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    res.status(500).json({
      error: 'Failed to process chat message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

function generateContextualLinks(currentPath: string, message: string) {
  const links = [];

  // Always include general resources
  links.push({ text: "Check Learning Resources", url: "/library" });

  // Add topic-specific links based on message content
  const messageLower = message.toLowerCase();

  if (messageLower.includes('smart contract') || messageLower.includes('ethereum')) {
    links.push(
      { text: "Smart Contracts Guide", url: "/modules/module3/smart-contracts" },
      { text: "Ethereum Fundamentals", url: "/modules/module3/ethereum-fundamentals" }
    );
  }

  if (messageLower.includes('bitcoin') || messageLower.includes('cryptocurrency')) {
    links.push(
      { text: "Bitcoin Fundamentals", url: "/modules/module2/bitcoin-fundamentals" },
      { text: "Crypto Market Overview", url: "/modules/module1/crypto-market" }
    );
  }

  if (messageLower.includes('defi') || messageLower.includes('yield') || messageLower.includes('liquidity')) {
    links.push(
      { text: "DeFi Introduction", url: "/defi/module1/defi-intro" },
      { text: "Liquidity & Yield", url: "/defi/module1/liquidity-yield" }
    );
  }

  if (messageLower.includes('security') || messageLower.includes('risk')) {
    links.push(
      { text: "Security Best Practices", url: "/modules/module1/security" },
      { text: "Risk Management", url: "/modules/module2/security-risk" }
    );
  }

  return links;
}

export default router;