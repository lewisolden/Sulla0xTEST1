import { Router } from 'express';
import { z } from 'zod';
import { db } from "@db";
import { eq } from 'drizzle-orm';
import { courseEnrollments } from "@db/schema";

const router = Router();

// Test endpoint for Perplexity API
router.post("/chat/test", async (req, res) => {
  console.log('[Chat Test] Received request to /chat/test');
  try {
    // Remove authentication check for test endpoint
    // Check if API key exists and validate format
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
      search_domain_filter: ["perplexity.ai"],
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "month",
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

export default router;