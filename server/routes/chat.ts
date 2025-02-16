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
    let systemMessage = `You are Sensei, the dedicated AI tutor for Sulla's learning platform. Be direct and concise in your responses, focusing on key information. Your purpose is to help students understand our course materials.

Key guidelines:
- ONLY reference content from Sulla's platform
- NEVER suggest external resources
- Keep responses brief and focused
- Use simple, clear language

Current context: `;

    // Add context-specific instructions
    if (context.includes('/ai/')) {
      systemMessage += `You are assisting with our Artificial Intelligence curriculum. Focus exclusively on the concepts covered in our AI modules:
- Module 1: AI Foundations
- Module 2: AI Applications
- Module 3: Advanced AI

When answering, point to specific sections in these modules.`;
    } else if (context.includes('/blockchain/')) {
      systemMessage += `You are assisting with our Blockchain Technology curriculum. Focus exclusively on our modules:
- Module 1: Blockchain Foundations
- Module 2: Bitcoin Deep Dive
- Module 3: Ethereum & Smart Contracts
- Module 4: Advanced Topics

When answering, point to specific sections in these modules.`;
    }

    systemMessage += `

Core responsibilities:
1. Direct students to relevant platform sections
2. Encourage completion of exercises and quizzes
3. Reference only our curriculum materials
4. Keep responses clear and concise

Remember: You are Sensei, providing focused guidance through Sulla's curriculum.`;

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
        temperature: 0.3, // Lower temperature for more focused responses
        max_tokens: 200,  // Limit token length to encourage conciseness
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