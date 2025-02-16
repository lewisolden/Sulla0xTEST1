import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { type Express } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { users, adminUsers, type SelectUser, type SelectAdminUser, insertUserSchema, insertAdminUserSchema } from "@db/schema";
import { db } from "@db";
import { eq, or } from "drizzle-orm";
import { sendWelcomeEmail } from './services/email';

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function verifyPassword(supplied: string, stored: string) {
  const [hashedPassword, salt] = stored.split(".");
  if (!hashedPassword || !salt) return false;

  const hashedBuf = Buffer.from(hashedPassword, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return hashedBuf.length === suppliedBuf.length && timingSafeEqual(hashedBuf, suppliedBuf);
}

declare global {
  namespace Express {
    interface User extends Partial<SelectUser & SelectAdminUser> {
      role?: 'user' | 'admin';
    }
  }
}

export const requireAdmin = async (req: any, res: any, next: any) => {
  console.log('Admin check - isAuthenticated:', req.isAuthenticated());
  console.log('Admin check - user:', req.user);

  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, req.user.id))
    .limit(1);

  console.log('Admin check - admin record:', admin);

  if (!admin) {
    return res.status(403).json({ error: "Not authorized" });
  }

  next();
};

const PUBLIC_ROUTES = [
  '/deck',
  '/api/register',
  '/api/login'
];

function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route => path.startsWith(route));
}

export function setupAuth(app: Express) {
  const MemoryStore = createMemoryStore(session);
  const isProduction = process.env.NODE_ENV === 'production';

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || process.env.REPL_ID || "default-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  };

  if (isProduction) {
    app.set('trust proxy', 1);
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Add middleware to check for public routes
  app.use((req, res, next) => {
    if (isPublicRoute(req.path) || req.isAuthenticated()) {
      return next();
    }
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    // For non-API routes, allow the request to continue to be handled by the client-side router
    next();
  });

  // Regular user strategy
  passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(
          or(
            eq(users.username, username),
            eq(users.email, username)
          )
        )
        .limit(1);

      if (!user) {
        return done(null, false, { message: "Incorrect username or email." });
      }

      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, { ...user, role: 'user' });
    } catch (err) {
      return done(err);
    }
  }));

  // Admin strategy
  passport.use('admin-local', new LocalStrategy(async (username, password, done) => {
    try {
      const [admin] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, username))
        .limit(1);

      if (!admin) {
        return done(null, false, { message: "Incorrect admin username." });
      }

      const isValid = await verifyPassword(password, admin.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, { ...admin, role: 'admin' });
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user: Express.User, done) => {
    done(null, { id: user.id, role: user.role });
  });

  passport.deserializeUser(async (data: { id: number, role?: string }, done) => {
    try {
      if (data.role === 'admin') {
        const [admin] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.id, data.id))
          .limit(1);
        done(null, { ...admin, role: 'admin' });
      } else {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, data.id))
          .limit(1);
        done(null, { ...user, role: 'user' });
      }
    } catch (err) {
      done(err);
    }
  });

  // Admin login route with improved error handling and logging
  app.post("/api/admin/login", async (req, res, next) => {
    console.log('Admin login attempt:', { username: req.body.username });

    try {
      const [existingAdmin] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, req.body.username))
        .limit(1);

      if (!existingAdmin) {
        console.log('Admin login failed: User not found');
        return res.status(401).json({
          error: "Invalid credentials"
        });
      }

      passport.authenticate("admin-local", async (err: any, admin: Express.User | false, info: IVerifyOptions) => {
        if (err) {
          console.error("Admin login error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (!admin) {
          console.log('Admin login failed:', info?.message);
          return res.status(401).json({
            error: info?.message || "Invalid credentials"
          });
        }

        try {
          await new Promise((resolve, reject) => {
            req.logIn(admin, (err) => {
              if (err) reject(err);
              else resolve(admin);
            });
          });

          console.log('Admin login successful:', { id: admin.id, username: admin.username });
          return res.json({
            message: "Admin login successful",
            user: {
              id: admin.id,
              username: admin.username,
              role: 'admin'
            }
          });
        } catch (error) {
          console.error("Session error:", error);
          return res.status(500).json({ error: "Failed to create session" });
        }
      })(req, res, next);
    } catch (error) {
      console.error("Admin login database error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Regular authentication routes
  app.post("/api/register", async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: result.error.issues.map((issue) => issue.message).join(", ")
        });
      }

      const { username, email, password } = result.data;

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const [newUser] = await db
        .insert(users)
        .values({
          username,
          email,
          password: await hashPassword(password),
        })
        .returning();

      // Send welcome email and handle the result
      const emailResult = await sendWelcomeEmail(email, username);

      req.login({ ...newUser, role: 'user' }, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).json({
          message: "Registration successful",
          user: { id: newUser.id, username: newUser.username, role: 'user' },
          emailStatus: {
            sent: emailResult.sent,
            note: process.env.NODE_ENV !== 'production'
              ? "In testing mode, welcome emails are only sent to verified email addresses."
              : emailResult.note
          }
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).json({ error: info.message ?? "Login failed" });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.json({
          message: "Login successful",
          user: { id: user.id, username: user.username, role: user.role },
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not logged in" });
    }
    res.json(req.user);
  });
  app.post("/api/admin/register", requireAdmin, async (req, res, next) => {
    try {
      const result = insertAdminUserSchema.safeParse(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: result.error.issues.map((issue) => issue.message).join(", ") });
      }

      const { username, email, password, role = 'admin' } = result.data;

      const [existingUsername] = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, username))
        .limit(1);

      if (existingUsername) {
        return res.status(400).json({ error: "Admin username already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const [newAdmin] = await db
        .insert(adminUsers)
        .values({
          username,
          email,
          password: hashedPassword,
          role,
        })
        .returning();

      res.status(201).json({
        message: "Admin registration successful",
        admin: { id: newAdmin.id, username: newAdmin.username, role: newAdmin.role },
      });
    } catch (error) {
      console.error("Admin registration error:", error);
      next(error);
    }
  });
}