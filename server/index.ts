import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import session from "express-session";
import MemoryStore from "memorystore";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy - required for secure cookies in production
app.set('trust proxy', 1);

// Session configuration
const SessionStore = MemoryStore(session);
app.use(
  session({
    cookie: {
      maxAge: 86400000, // 24 hours
      secure: process.env.NODE_ENV === "production",
    },
    secret: process.env.SESSION_SECRET || 'development_secret',
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
  })
);

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

(async () => {
  try {
    log("Starting server initialization...");
    const server = registerRoutes(app);

    // Error handling middleware - should be last
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
      // Don't throw here, just log
      console.error(err);
    });

    const isProduction = process.env.NODE_ENV === 'production';
    const PORT = 5000; // Explicitly set port to 5000

    if (!isProduction) {
      log("Setting up Vite middleware...");
      await setupVite(app, server);
      log("Vite middleware setup complete");
    } else {
      log("Setting up static file serving...");
      serveStatic(app);
      log("Static file serving setup complete");
    }

    log(`Attempting to start server on port ${PORT}...`);

    server.listen(PORT, "0.0.0.0", () => {
      log(`Server is running on port ${PORT}`);
    });

    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${PORT} is already in use`);
      } else {
        log(`Server error: ${error.message}`);
      }
      process.exit(1);
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    console.error(error);
    process.exit(1);
  }
})();