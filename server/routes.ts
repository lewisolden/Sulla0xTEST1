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

// ES Module path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerRoutes(app: Express): Server {
  // Add debug middleware for API routes
  app.use('/api', (req, res, next) => {
    console.log(`[API Debug] ${req.method} ${req.path} User Auth:`, req.isAuthenticated());
    next();
  });

  // Register chat routes before other routes and auth setup
  app.use("/api/chat", chatRouter);

  // Set up authentication after chat routes
  setupAuth(app);

  // Register other API routes
  app.use("/api/admin", adminRouter); // Changed to mount admin routes under /api/admin
  app.use("/api", apiRouter);
  app.use("/api", enrollmentsRouter);
  app.use("/api", learningPathRouter);
  app.use("/api", userMetricsRouter);

  // Add catch-all handler for API routes
  app.use('/api/*', (req, res) => {
    console.log('[API 404]', {
      method: req.method,
      path: req.path
    });
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}