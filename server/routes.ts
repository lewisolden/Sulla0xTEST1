import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizzes, userQuizResponses } from "@db/schema";
import { eq } from "drizzle-orm";
import { setupAuth } from "./auth";
import enrollmentsRouter from "./routes/enrollments";
import path from 'path';
import { fileURLToPath } from 'url';
import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';

// ES Module path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialize puppeteer browser
let browserInstance: Browser | null = null;
async function getBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browserInstance;
}

export function registerRoutes(app: Express): Server {
  // Set up authentication routes first
  setupAuth(app);

  // Register enrollments routes
  app.use(enrollmentsRouter);

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

      // Store response if user is authenticated
      if (req.user) {
        await db.insert(userQuizResponses).values({
          userId: req.user.id,
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