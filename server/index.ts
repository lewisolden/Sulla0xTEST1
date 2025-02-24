import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupAuth } from "./auth";
import { db } from "@db";
import { users } from "@db/schema";
import { verifyEmailService } from "./services/email";

// Force Vite to allow all hosts in development
process.env.VITE_DEV_SERVER_FORCE_ALLOW_ALL_HOSTS = 'true';

const app = express();

// Add middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy - required for secure cookies in production
app.set('trust proxy', 1);

// Add API middleware before auth setup
app.use('/api', (req, res, next) => {
  // Set JSON content type for all API routes
  res.setHeader('Content-Type', 'application/json');
  console.log(`[API Debug] ${req.method} ${req.path}`);
  next();
});

// Set up authentication
setupAuth(app);

// Add request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  log(`${req.method} ${req.path} - Starting request`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });

  next();
});

// Create server instance
const server = app.listen(5000, "0.0.0.0", () => {
  log(`Server started on port 5000`);

  // Register routes first
  registerRoutes(app);

  const isProduction = process.env.NODE_ENV === 'production';

  // Set up Vite or static file serving based on environment
  if (!isProduction) {
    setupVite(app, server).catch(error => {
      log(`Failed to setup Vite: ${error}`);
      process.exit(1);
    });
  } else {
    serveStatic(app);
  }

  // Initialize background services
  Promise.all([
    verifyEmailService().catch(error => {
      log(`Email service initialization warning: ${error.message}`);
    }),
    db.select().from(users).limit(1).then(() => {
      log("Database connection verified");
    }).catch(error => {
      log("Database connection warning:", error instanceof Error ? error.message : String(error));
    })
  ]).catch(error => {
    log(`Background service initialization warning: ${error.message}`);
  });
});

// Add catch-all handler for API routes that aren't found
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  log(`Error: ${message}`);

  // Always return JSON for API routes
  if (_req.path.startsWith('/api/')) {
    res.status(status).json({ error: message });
  } else {
    res.status(status).send(message);
  }
  console.error(err);
});

// Handle server errors
server.on('error', (error: any) => {
  if (error.code === 'EADDRINUSE') {
    log(`Port 5000 is in use`);
    process.exit(1);
  } else {
    log(`Unexpected server error: ${error}`);
    process.exit(1);
  }
});