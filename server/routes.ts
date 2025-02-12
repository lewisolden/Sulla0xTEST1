import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizzes, userQuizResponses, users, courseEnrollments, moduleProgress, achievements, userAchievements } from "@db/schema";
import { eq, count, sql } from "drizzle-orm";
import { setupAuth, requireAdmin } from "./auth";
import enrollmentsRouter from "./routes/enrollments";
import userMetricsRouter from "./routes/user-metrics";
import progressRouter from "./routes/progress";
import apiRouter from "./routes/api";
import adminRouter from "./routes/admin";
import path from 'path';
import { fileURLToPath } from 'url';
import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';
import { sendTestEmail } from './services/email';

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
  // Mount API router first
  app.use("/api", apiRouter);

  // Mount admin routes
  app.use("/api/admin", adminRouter);

  // Add progress routes
  app.use(progressRouter);

  // Add email test endpoint
  app.get("/api/email/test", async (req, res) => {
    try {
      const result = await sendTestEmail();
      console.log('Test email result:', result);

      if (result.success) {
        res.json({ 
          success: true,
          messageId: result.messageId,
          message: "Test email sent successfully to verified test recipient."
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: result.error,
          message: "Failed to send test email. Make sure you have configured Resend API correctly."
        });
      }
    } catch (error) {
      console.error("Error sending test email:", error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        message: "An unexpected error occurred while sending the test email."
      });
    }
  });

  // Set up authentication routes
  setupAuth(app);

  // Register other routes
  app.use(enrollmentsRouter);
  app.use(userMetricsRouter);

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}