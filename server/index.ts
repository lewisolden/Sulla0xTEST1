import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupAuth } from "./auth";
import { db } from "@db";
import { users } from "@db/schema";

const app = express();

// Add middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy - required for secure cookies in production
app.set('trust proxy', 1);

// Add request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  // Capture JSON responses for logging
  const originalJsonSend = res.json;
  res.json = function(body) {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms :: ${JSON.stringify(body).slice(0, 100)}`);
    }
    return originalJsonSend.call(this, body);
  };

  next();
});

let server: any = null;
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    log("Starting server initialization...");

    // Verify database connection
    try {
      await db.select().from(users).limit(1);
      log("Database connection verified");
    } catch (error) {
      log("Database connection failed:", error instanceof Error ? error.message : String(error));
      process.exit(1);
    }

    // Setup authentication first
    setupAuth(app);

    // Then register routes
    server = registerRoutes(app);

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

    // Function to try starting the server on a given port
    const tryStartServer = (port: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        try {
          server.listen(port, "0.0.0.0", () => {
            log(`Server is running on port ${port}`);
            resolve();
          }).on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              log(`Port ${port} is in use, will try next port`);
              resolve(tryStartServer(port + 1));
            } else {
              reject(err);
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    };

    // Start the server
    await tryStartServer(Number(PORT));

  } catch (error) {
    log(`Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
    console.error(error);
    process.exit(1);
  }
})();