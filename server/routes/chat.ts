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

// Function to get API key with enhanced error handling
function getPerplexityApiKey() {
  const apiKey = process.env.PERPLEXITY_API_KEY?.trim();
  console.log('[Chat] API Key Check:', {
    exists: Boolean(apiKey),
    length: apiKey?.length || 0,
    format: apiKey?.startsWith('pplx-') || false,
    environment: process.env.NODE_ENV || 'unknown'
  });

  if (!apiKey) {
    throw new Error('Missing Perplexity API key in environment');
  }

  if (!apiKey.match(/^pplx-[a-zA-Z0-9]{48}$/)) {
    throw new Error('Invalid Perplexity API key format');
  }

  return apiKey;
}

// Main chat endpoint
router.post("/send", async (req, res) => {
  console.log('[Chat] Starting chat request processing');

  try {
    // Validate request body
    const result = chatMessageSchema.safeParse(req.body);
    if (!result.success) {
      console.error('[Chat] Validation error:', result.error);
      return res.status(400).json({
        error: 'Invalid request format',
        details: result.error.errors
      });
    }

    const { message, context } = result.data;

    // Get API key with enhanced error handling
    let apiKey;
    try {
      apiKey = getPerplexityApiKey();
    } catch (error) {
      console.error('[Chat] API Key Error:', error.message);
      return res.status(500).json({
        error: 'API configuration error',
        details: error.message
      });
    }

    // Prepare messages for the API request
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

    console.log('[Chat] Preparing API request');

    // Make request to Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages,
        temperature: 0.3,
        max_tokens: 250,
        top_p: 0.9,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Chat] Perplexity API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();
    console.log('[Chat] Received API response');

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    const responseData = {
      success: true,
      response: {
        message: data.choices[0].message.content,
        links: generateContextualLinks(context.currentPath, message)
      }
    };

    console.log('[Chat] Sending successful response');
    res.json(responseData);

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

// Function to generate contextual links based on content
function generateContextualLinks(currentPath: string, message: string) {
  const links = [];
  links.push({ text: "Check Learning Resources", url: "/glossary" });

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

  if (messageLower.includes('defi') || messageLower.includes('yield') || messageLower.includes('liquidity')) {
    links.push(
      { text: "DeFi Introduction", url: "/defi/module1/defi-intro" },
      { text: "DEX & AMM Guide", url: "/defi/module1/dex-amm" },
      { text: "Liquidity & Yield", url: "/defi/module1/liquidity-yield" }
    );
  }

  return links;
}

export default router;