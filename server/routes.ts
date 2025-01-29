import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizzes, userQuizResponses } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get quizzes for a specific module
  app.get("/api/modules/:moduleId/quizzes", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.moduleId);
      const moduleQuizzes = await db.query.quizzes.findMany({
        where: eq(quizzes.moduleId, moduleId),
        orderBy: (quizzes) => quizzes.order,
      });
      res.json(moduleQuizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  // Submit a quiz answer
  app.post("/api/modules/:moduleId/quizzes/:quizId/answer", async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId);
      const { answer } = req.body;

      const quiz = await db.query.quizzes.findFirst({
        where: eq(quizzes.id, quizId),
      });

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const isCorrect = answer === quiz.correctAnswer;

      // If user is authenticated, store their response
      if (req.user) {
        await db.insert(userQuizResponses).values({
          userId: (req.user as any).id,
          quizId,
          selectedAnswer: answer,
          isCorrect,
        });
      }

      res.json({
        isCorrect,
        explanation: quiz.explanation,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process answer" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}