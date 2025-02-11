import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { quizzes, userQuizResponses, users, courseEnrollments, moduleProgress, achievements, userAchievements } from "@db/schema";
import { eq, count, sql } from "drizzle-orm";
import { setupAuth, requireAdmin } from "./auth";
import enrollmentsRouter from "./routes/enrollments";
import userMetricsRouter from "./routes/user-metrics";
import apiRouter from "./routes/api";
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

  // Set up authentication routes
  setupAuth(app);

  // Register other routes
  app.use(enrollmentsRouter);
  app.use(userMetricsRouter);

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}