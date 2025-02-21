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

// Function to generate contextual links based on content
function generateContextualLinks(currentPath: string, message: string) {
  const links = [];

  // Default learning resources link points to glossary
  links.push({ text: "Check Learning Resources", url: "/glossary" });

  // Add topic-specific links based on message content
  const messageLower = message.toLowerCase();

  if (messageLower.includes('smart contract') || messageLower.includes('ethereum')) {
    links.push(
      { text: "Ethereum Smart Contracts Module", url: "/modules/module3/smart-contracts" },
      { text: "Ethereum Fundamentals", url: "/modules/module3/ethereum-fundamentals" }
    );
  }

  if (messageLower.includes('bitcoin') || messageLower.includes('cryptocurrency')) {
    links.push(
      { text: "Bitcoin Fundamentals", url: "/modules/module2/bitcoin-fundamentals" },
      { text: "Crypto Market Guide", url: "/modules/module1/crypto-market" }
    );
  }

  if (messageLower.includes('defi') || messageLower.includes('yield') || messageLower.includes('liquidity') || messageLower.includes('flash loan') || messageLower.includes('dex')) {
    links.push(
      { text: "DeFi Introduction", url: "/defi/module1/defi-intro" },
      { text: "DEX & AMM Guide", url: "/defi/module1/dex-amm" },
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
      return res.status(500).json({
        error: 'API configuration error',
        details: 'Missing Perplexity API key configuration'
      });
    }

    if (!apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/)) {
      console.error('[Chat] Invalid API key format:', apiKey.substring(0, 10) + '...');
      return res.status(500).json({
        error: 'API configuration error',
        details: 'Invalid Perplexity API key format'
      });
    }

    const messages = [{
      role: "system",
      content: "You are Sensei, an educational AI tutor specializing in blockchain education. " +
               "Provide brief, direct responses (2-3 sentences) and always reference Sulla's course modules. " +
               `The user is currently viewing: ${context.currentPath}. ` +
               "For Ethereum topics, direct users to Module 3. " +
               "For Bitcoin topics, reference Modules 1-2. " +
               "For DeFi topics, reference the DeFi modules. " +
               "Focus on guiding users to our course materials rather than external resources."
    }];

    messages.push({
      role: "user",
      content: message
    });

    console.log('[Chat] Sending request to Perplexity API with messages:', JSON.stringify(messages, null, 2));

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
      console.error('[Chat] Perplexity API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Perplexity API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    console.log('[Chat] Perplexity API response:', JSON.stringify(data, null, 2));

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from Perplexity API');
    }

    res.json({
      success: true,
      response: {
        message: data.choices[0].message.content,
        links: generateContextualLinks(context.currentPath, message)
      }
    });

  } catch (error) {
    console.error('[Chat] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Chat] Detailed error:', errorMessage);

    res.status(500).json({
      error: 'Failed to process chat message',
      details: errorMessage
    });
  }
});

export default router;