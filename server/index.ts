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

// Host header middleware - must be first
app.use((req, res, next) => {
  // Force localhost:5000 as host for Vite in development
  if (process.env.NODE_ENV !== 'production') {
    req.headers.host = 'localhost:5000';
  }
  next();
});

// Add middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy - required for secure cookies in production
app.set('trust proxy', 1);

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

let server: any = null;
const tryPorts = [5000, 5001, 5002, 5003];

(async () => {
  try {
    log("Starting server initialization...");

    // Setup authentication first
    setupAuth(app);

    // Then register routes
    server = registerRoutes(app);

    const isProduction = process.env.NODE_ENV === 'production';

    // Set up Vite or static file serving AFTER API routes
    if (!isProduction) {
      log("Setting up Vite middleware...");
      await setupVite(app, server);
      log("Vite middleware setup complete");
    } else {
      log("Setting up static file serving...");
      serveStatic(app);
      log("Static file serving setup complete");
    }

    // Try ports sequentially until one works
    for (const port of tryPorts) {
      try {
        await new Promise((resolve, reject) => {
          server.listen(port, "0.0.0.0", () => {
            log(`Server successfully started on port ${port}`);
            resolve(true);
          });

          server.on('error', (error: Error) => {
            if ((error as any).code === 'EADDRINUSE') {
              log(`Port ${port} is in use, trying next port...`);
              resolve(false);
            } else {
              reject(error);
            }
          });
        });

        // If we get here and server is listening, we found a working port
        if (server.listening) {
          break;
        }
      } catch (error) {
        log(`Error trying port ${port}: ${error}`);
        // Continue to next port
      }
    }

    if (!server.listening) {
      throw new Error('Failed to find an available port');
    }

    // Initialize services in the background
    verifyEmailService().catch(error => {
      log(`Email service initialization warning: ${error.message}`);
    });

    // Verify database connection
    try {
      await db.select().from(users).limit(1);
      log("Database connection verified");
    } catch (error) {
      log("Database connection warning:", error instanceof Error ? error.message : String(error));
    }

  } catch (error) {
    log(`Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
    process.exit(1);
  }
})();

// Add catch-all handler for API routes that aren't found
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  log(`Error: ${message}`);
  res.status(status).json({ error: message });
  console.error(err);
});