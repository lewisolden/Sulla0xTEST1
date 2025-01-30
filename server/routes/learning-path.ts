import { Router } from "express";
import { db } from "@db";
import { moduleProgress } from "@db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";
import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const router = Router();
const openai = new OpenAI();

interface LearningRecommendation {
  nextTopic: string;
  reason: string;
  suggestedResources: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface QuizResult {
  topicId: string;
  score: number;
}

// Get personalized learning recommendations
router.get("/api/learning-path/recommendations", async (req: Request, res: Response) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Get user's progress data
    const userProgress = await db.query.moduleProgress.findMany({
      where: eq(moduleProgress.userId, req.session.userId),
    });

    // Get quiz results - for now we'll mock this until we implement the quiz results table
    const mockQuizResults: QuizResult[] = [
      { topicId: "blockchain-basics", score: 0.8 },
      { topicId: "digital-currencies", score: 0.9 },
      { topicId: "cryptography", score: 0.6 }
    ];

    // Analyze user's learning pattern
    const completedTopics = userProgress.filter(p => p.completed).length;
    const averageQuizScore = mockQuizResults.reduce((acc: number, q: QuizResult) => acc + q.score, 0) / mockQuizResults.length;
    const strugglingTopics = mockQuizResults
      .filter((q: QuizResult) => q.score < 0.7) // Less than 70% correct
      .map((q: QuizResult) => q.topicId);

    // Generate AI recommendations using OpenAI
    const prompt = `As a cryptocurrency education expert, provide a personalized learning recommendation based on the following user data:
      - Completed topics: ${completedTopics}
      - Average quiz score: ${averageQuizScore}
      - Struggling topics: ${strugglingTopics.join(", ")}

      Generate a recommendation that includes:
      1. The next topic they should focus on
      2. Why this topic is recommended
      3. Additional resources that could help
      4. Appropriate difficulty level

      Format the response as a JSON object with the following structure:
      {
        "nextTopic": "topic name",
        "reason": "explanation",
        "suggestedResources": ["resource1", "resource2"],
        "difficulty": "beginner|intermediate|advanced"
      }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    if (!completion.choices[0].message.content) {
      throw new Error("No recommendation generated");
    }

    const recommendation: LearningRecommendation = JSON.parse(completion.choices[0].message.content);

    res.json({
      userStats: {
        completedTopics,
        averageQuizScore,
        strugglingTopics
      },
      recommendation
    });

  } catch (error) {
    console.error("Error generating learning recommendations:", error);
    res.status(500).json({ error: "Failed to generate learning recommendations" });
  }
});

export default router;