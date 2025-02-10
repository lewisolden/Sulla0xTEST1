import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy - required for secure cookies in production
app.set('trust proxy', 1);

// Add Content-Security-Policy headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});

// Add request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

(async () => {
  try {
    log("Starting server initialization...");
    const PORT = 5000;

    // Set up Vite middleware in development
    if (process.env.NODE_ENV !== 'production') {
      await setupVite(app);
    }

    log("Setting up initial middleware...");
    const server = registerRoutes(app);

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      app.use(serveStatic());
    }

    // Start server on port 5000
    server.listen(PORT, "0.0.0.0", () => {
      log(`Server successfully started on port ${PORT}`);
    }).on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        log(`Failed to start server: ${error.message}`);
        process.exit(1);
      }
    });

    // Error handling middleware - should be last
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
      console.error(err);
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    console.error(error);
    process.exit(1);
  }
})();