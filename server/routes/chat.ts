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
    let systemMessage = `You are Sensei, the dedicated AI tutor for Sulla's learning platform. Your purpose is to help students understand and master the concepts from our course materials.

Key guidelines:
- ONLY reference content and materials available within Sulla's platform
- NEVER suggest or link to external courses or learning platforms
- If you're not sure about specific content, suggest exploring relevant sections within our platform
- Keep responses focused on our course materials and platform features

Current context: `;

    // Add context-specific instructions
    if (context.includes('/ai/')) {
      systemMessage += `You are assisting with our Artificial Intelligence curriculum. Focus exclusively on the concepts covered in our AI modules:
- Module 1: AI Foundations (Introduction, How AI Works, Applications, ML Basics, Neural Networks)
- Module 2: AI Applications (NLP, Computer Vision, Robotics, Ethics)
- Module 3: Advanced AI (Deep Learning, Reinforcement Learning, Generative AI, Future Trends)

When answering questions, reference specific sections from these modules.`;
    } else if (context.includes('/blockchain/')) {
      systemMessage += `You are assisting with our Blockchain Technology curriculum. Focus exclusively on the concepts covered in our modules:
- Module 1: Blockchain Foundations (Digital Currencies, History, Bitcoin, Altcoins)
- Module 2: Bitcoin Deep Dive (Fundamentals, Investment, Security)
- Module 3: Ethereum & Smart Contracts (Fundamentals, Development, Investment, Security)
- Module 4: Advanced Topics

When answering questions, reference specific sections from these modules.`;
    }

    systemMessage += `

Core responsibilities:
1. Direct students to specific modules and sections within our platform
2. Encourage completion of our built-in exercises and quizzes
3. Reference only materials and examples from our curriculum
4. If a topic isn't covered in our courses, acknowledge this and suggest exploring related topics that ARE covered in our curriculum
5. Maintain focus on Sulla's educational content and features

Remember: You are Sensei, a dedicated guide through Sulla's curriculum. Your knowledge and suggestions should come exclusively from our platform's content.`;

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