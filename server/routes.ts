import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizzes, userQuizResponses, users, courseEnrollments, moduleProgress, achievements, userAchievements } from "@db/schema";
import { eq, count, sql } from "drizzle-orm";
import { setupAuth, requireAdmin } from "./auth";
import enrollmentsRouter from "./routes/enrollments";
import userMetricsRouter from "./routes/user-metrics";
import apiRouter from "./routes/api";
import adminRouter from "./routes/admin";
import learningPathRouter from "./routes/learning-path"; // Import learning path router
import path from 'path';
import { fileURLToPath } from 'url';
import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';
import { sendTestEmail } from './services/email';
import { verifyEmailService } from './services/email'; // Import the verification function


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

  // Mount admin routes with the new detailed analytics endpoint
  app.use("/api/admin", adminRouter);
  // Add new detailed analytics endpoint here.  Implementation details are missing from the edited code.
  app.get('/api/admin/detailed-analytics', requireAdmin, async (req, res) => {
    try {
      // Implement detailed analytics logic here.  This is a placeholder.
      res.json({ message: 'Detailed analytics endpoint (placeholder)' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch detailed analytics' });
    }
  });


  // Add learning path routes
  app.use(learningPathRouter);

  // Add email test endpoint
  app.get("/api/email/test", async (req, res) => {
    try {
      const verificationResult = await verifyEmailService();
      const result = await sendTestEmail();
      console.log('Email service verification:', verificationResult);
      console.log('Test email result:', result);

      if (result.success) {
        res.json({ 
          success: true,
          messageId: result.messageId,
          serviceStatus: verificationResult,
          message: "Test email sent successfully to verified test recipient."
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: result.error,
          serviceStatus: verificationResult,
          message: "Failed to send test email. Check email service configuration."
        });
      }
    } catch (error) {
      console.error("Error in email test endpoint:", error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        message: "An unexpected error occurred while testing the email service."
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