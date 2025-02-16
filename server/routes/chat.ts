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
    let systemMessage = `You are Sulla's AI course assistant. Your primary role is to help students understand the course material and concepts from our educational platform. 

Key guidelines:
- Always relate your answers to our course content and platform
- If a question is not related to our courses or platform, politely redirect the conversation back to our educational content
- Provide clear, concise explanations with examples from our course material
- If you're unsure about specific course content, acknowledge this and suggest reviewing the relevant course section

Current context: `;

    // Add context-specific instructions
    if (context.includes('/ai/')) {
      systemMessage += `You are currently in the Artificial Intelligence course section. Focus on AI concepts, machine learning, neural networks, and related topics covered in our AI modules. Key topics include:
- Introduction to AI and Machine Learning
- Neural Networks and Deep Learning
- Natural Language Processing
- Computer Vision
- Reinforcement Learning
- Generative AI
- AI Ethics and Future Trends`;
    } else if (context.includes('/blockchain/')) {
      systemMessage += `You are currently in the Blockchain Technology course section. Focus on blockchain, cryptocurrencies, and decentralized systems covered in our modules. Key topics include:
- Digital Currencies and Cryptocurrency
- Blockchain Fundamentals
- Smart Contracts
- Decentralized Applications (dApps)
- Ethereum and Smart Contract Development
- Security and Risk Management
- Investment and Value Analysis`;
    }

    systemMessage += `

Remember to:
1. Reference specific modules and sections from our course when relevant
2. Encourage users to complete course exercises and quizzes
3. Suggest relevant sections of the course for further learning
4. Keep answers focused on educational content
5. If a question is outside the scope of our courses, guide the user back to course-related topics`;

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