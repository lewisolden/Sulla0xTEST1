import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string()
});

router.post('/chat', async (req, res) => {
  try {
    const { message, context } = chatSchema.parse(req.body);

    // Format the system message based on the current course context
    let systemMessage = "You are a helpful AI course assistant. ";
    
    // Add context-specific instructions
    if (context.includes('/ai/')) {
      systemMessage += "You specialize in artificial intelligence, machine learning, and data science concepts. ";
    } else if (context.includes('/blockchain/')) {
      systemMessage += "You specialize in blockchain technology, cryptocurrencies, and decentralized systems. ";
    }
    
    systemMessage += "Provide clear, concise explanations and examples when helping students. If you're not sure about something, say so.";

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
        max_tokens: 500,
        top_p: 0.9,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Perplexity API error:', error);
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

export default router;
