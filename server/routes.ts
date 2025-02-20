import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { setupAuth, requireAdmin } from "./auth";
import enrollmentsRouter from "./routes/enrollments";
import userMetricsRouter from "./routes/user-metrics";
import apiRouter from "./routes/api";
import adminRouter from "./routes/admin";
import learningPathRouter from "./routes/learning-path";
import chatRouter from "./routes/chat";
import path from 'path';
import { fileURLToPath } from 'url';
import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer';
import { sendTestEmail } from './services/email';
import { verifyEmailService } from './services/email';

// ES Module path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerRoutes(app: Express): Server {
  // Set up authentication first
  setupAuth(app);

  // Register API routes with proper prefixes and authentication middleware
  app.use("/api", apiRouter);
  app.use("/api", enrollmentsRouter);
  app.use("/api/admin", requireAdmin, adminRouter);
  app.use("/api", learningPathRouter);
  app.use("/api", userMetricsRouter);
  app.use("/api", chatRouter);

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}