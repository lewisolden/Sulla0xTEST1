import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizzes, userQuizResponses } from "@db/schema";
import { eq } from "drizzle-orm";
import { setupAuth } from "./auth";
import puppeteer from 'puppeteer';

export function registerRoutes(app: Express): Server {
  // Set up authentication routes
  setupAuth(app);

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

  // Download deck as PDF
  app.get("/api/deck/download", async (req, res) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();

      // Get the full URL of the deck page
      const host = req.get('host');
      const protocol = req.protocol;
      await page.goto(`${protocol}://${host}/deck`, {
        waitUntil: 'networkidle0'
      });

      // Wait for content to load
      await page.waitForSelector('.deck-slide');

      // Generate PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      await browser.close();

      // Send PDF
      res.contentType('application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=sulla-presentation.pdf');
      res.send(pdf);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}