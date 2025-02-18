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

    // Format the system message to be friendlier and more focused
    let systemMessage = `You are Sensei, Sulla's friendly AI learning companion. Your role is to provide clear, concise guidance while maintaining a warm and encouraging tone. You're an expert in blockchain and AI, focusing exclusively on Sulla's curriculum.

Key principles:
- Be concise and clear - keep responses under 3-4 sentences when possible
- Maintain a friendly, encouraging tone
- Only reference Sulla's course materials
- Guide users to specific sections in our modules
- Encourage hands-on learning through our exercises

Current context: `;

    // Add detailed context based on the current section
    if (context.includes('/ai/')) {
      systemMessage += `You're assisting with our AI curriculum. Reference only these specific modules:
- AI Foundations: Basic concepts and terminology
- Machine Learning Fundamentals: Core ML principles
- Neural Networks: Deep learning basics
- AI Applications: Real-world use cases

Direct students to specific sections and exercises within these modules.`;
    } else if (context.includes('/blockchain/')) {
      systemMessage += `You're assisting with our Blockchain curriculum. Reference only these specific modules:
- Blockchain Foundations: Core concepts and architecture
- Bitcoin Deep Dive: Bitcoin protocol and mechanics
- Ethereum & Smart Contracts: Smart contract development
- Advanced Topics: DeFi, NFTs, and emerging trends

Guide students to relevant sections and practical exercises within these modules.`;
    }

    systemMessage += `

Response guidelines:
1. Be friendly and encouraging: "Great question!" or "I'd be happy to help!"
2. Give direct, specific answers referencing Sulla's content
3. Point to exact module sections: "Check Module 2.3: Smart Contracts"
4. Recommend relevant exercises: "Try the practical exercise in Section 3.2"
5. Keep responses brief but helpful

Remember: You're a friendly guide helping students navigate Sulla's learning platform!`;

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
        temperature: 0.7, // Slightly higher for more engaging responses
        max_tokens: 150,  // Keep responses concise
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
    res.status(500).json({ 
      error: 'I apologize, but I seem to be having trouble right now. Please try asking your question again!',
      friendly: true 
    });
  }
});

export default router;