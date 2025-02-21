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
const tryPorts = [5000, 5001, 5002, 5003];

(async () => {
  try {
    log("Starting server initialization...");

    // Register routes BEFORE setting up Vite or static serving
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
    let port: number | null = null;
    for (const testPort of tryPorts) {
      try {
        await new Promise<void>((resolve, reject) => {
          const testServer = server.listen(testPort, "0.0.0.0", () => {
            port = testPort;
            log(`Server successfully started on port ${port}`);
            resolve();
          });

          testServer.once('error', (error: Error) => {
            if ((error as any).code === 'EADDRINUSE') {
              log(`Port ${testPort} is in use, trying next port...`);
              testServer.close();
              resolve();
            } else {
              reject(error);
            }
          });
        });

        if (port !== null) break;
      } catch (error) {
        log(`Error trying port ${testPort}: ${error}`);
        if (testPort === tryPorts[tryPorts.length - 1]) {
          throw new Error('Failed to find an available port');
        }
      }
    }

    if (port === null) {
      throw new Error('Failed to bind to any port');
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
    res.status(status).send({error: message}); // send for non-api routes
  }
  console.error(err);
});