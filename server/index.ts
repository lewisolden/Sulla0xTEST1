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

  // Add detailed logging for API routes
  if (req.path.startsWith('/api/')) {
    console.log('[API Request]', {
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });

  next();
});

let server: any = null;

// Try to start server on a specific port
async function startServer(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      // Create server instance
      const newServer = app.listen(port, "0.0.0.0", () => {
        server = newServer;
        log(`Server successfully started on port ${port}`);
        resolve(true);
      });

      // Handle server errors
      newServer.once('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
          log(`Port ${port} is in use`);
          newServer.close();
          resolve(false);
        } else {
          log(`Unexpected error on port ${port}: ${error}`);
          newServer.close();
          resolve(false);
        }
      });

      // Add cleanup handler
      newServer.once('close', () => {
        if (server === newServer) {
          server = null;
        }
      });

    } catch (error) {
      log(`Error starting server on port ${port}: ${error}`);
      resolve(false);
    }
  });
}

// Main startup function
(async () => {
  try {
    log("Starting server initialization...");

    // Register routes first - this is lightweight
    registerRoutes(app);

    const isProduction = process.env.NODE_ENV === 'production';

    // Try ports sequentially
    const tryPorts = [5000, 5001, 5002, 5003];
    let started = false;
    let boundPort = null;

    for (const port of tryPorts) {
      log(`Attempting to start server on port ${port}...`);
      started = await startServer(port);
      if (started) {
        boundPort = port;
        break;
      }
    }

    if (!started || !server) {
      throw new Error('Failed to start server on any available port');
    }

    // Now that we have a bound port, set up the rest of the application
    if (!isProduction) {
      log("Setting up Vite middleware...");
      await setupVite(app, server);
      log("Vite middleware setup complete");
    } else {
      log("Setting up static file serving...");
      serveStatic(app);
      log("Static file serving setup complete");
    }

    // Initialize background services
    Promise.all([
      // Verify email service
      verifyEmailService().catch(error => {
        log(`Email service initialization warning: ${error.message}`);
      }),
      // Check database connection
      db.select().from(users).limit(1).then(() => {
        log("Database connection verified");
      }).catch(error => {
        log("Database connection warning:", error instanceof Error ? error.message : String(error));
      })
    ]).catch(error => {
      // Log but don't crash the server
      log(`Background service initialization warning: ${error.message}`);
    });

    log(`Server initialization complete on port ${boundPort}`);

  } catch (error) {
    log(`Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
    process.exit(1);
  }
})();

// Add catch-all handler for API routes that aren't found
app.use('/api/*', (req, res) => {
  console.log('[API 404]', {
    method: req.method,
    path: req.path,
    headers: req.headers
  });
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