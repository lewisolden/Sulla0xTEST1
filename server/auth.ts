import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { type Express } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { users, adminUsers, type SelectUser, type SelectAdminUser } from "@db/schema";
import { db } from "@db";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

const scryptAsync = promisify(scrypt);

// User schemas for validation
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long. Please use a longer password for better security."),
});

export const insertAdminUserSchema = insertUserSchema.extend({
  role: z.enum(['admin']).default('admin'),
});

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

const PUBLIC_ROUTES = [
  '/deck',
  '/api/register',
  '/api/login',
  '/api/admin/login',
  '/api/chat/test',
  '/api/chat/send'
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

  // Authentication status middleware
  app.use((req, res, next) => {
    console.log(`[Auth] Request to ${req.path} - Authenticated: ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
      console.log(`[Auth] User ID: ${req.user?.id}, Role: ${req.user?.role}`);
    }
    next();
  });

  // Regular user strategy
  passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
      console.log(`[Auth] Login attempt for username: ${username}`);

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
        console.log(`[Auth] User not found: ${username}`);
        return done(null, false, { message: "Incorrect username or email." });
      }

      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        console.log(`[Auth] Invalid password for user: ${username}`);
        return done(null, false, { message: "Incorrect password." });
      }

      console.log(`[Auth] Successful login for user: ${username}`);
      return done(null, { ...user, role: 'user' });
    } catch (err) {
      console.error(`[Auth] Error during authentication:`, err);
      return done(err);
    }
  }));

  // Admin strategy
  passport.use('admin-local', new LocalStrategy(async (username, password, done) => {
    try {
      console.log('Attempting admin login for username:', username);

      const [admin] = await db
        .select()
        .from(adminUsers)
        .where(
          or(
            eq(adminUsers.username, username),
            eq(adminUsers.email, username)
          )
        )
        .limit(1);

      console.log('Admin lookup result:', admin ? 'Found' : 'Not found');

      if (!admin) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const isValid = await verifyPassword(password, admin.password);
      console.log('Password verification:', isValid ? 'Success' : 'Failed');

      if (!isValid) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, { ...admin, role: 'admin' });
    } catch (err) {
      console.error('Admin authentication error:', err);
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

  // Admin login route
  app.post("/api/admin/login", (req, res, next) => {
    console.log('Admin login attempt:', { username: req.body.username });

    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    passport.authenticate("admin-local", (err: any, admin: Express.User | false, info: IVerifyOptions) => {
      if (err) {
        console.error("Admin login error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!admin) {
        console.log('Admin login failed:', info?.message);
        return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }

      req.logIn(admin, (err) => {
        if (err) {
          console.error("Session error:", err);
          return res.status(500).json({ error: "Failed to create session" });
        }

        console.log('Admin login successful:', { id: admin.id, username: admin.username });
        return res.json({
          message: "Admin login successful",
          user: {
            id: admin.id,
            username: admin.username,
            role: 'admin'
          }
        });
      });
    })(req, res, next);
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

  // Update the /api/user endpoint to include more detailed error handling
  app.get("/api/user", (req, res) => {
    console.log(`[Auth] User data request - Authenticated: ${req.isAuthenticated()}`);

    if (!req.isAuthenticated()) {
      console.log('[Auth] Unauthorized user data request');
      return res.status(401).json({ error: "Not logged in" });
    }

    if (!req.user) {
      console.log('[Auth] No user data found in authenticated session');
      return res.status(500).json({ error: "User session error" });
    }

    console.log(`[Auth] Returning user data for ID: ${req.user.id}`);
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

export const requireAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    console.log('Admin check failed - not authenticated');
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // Check if the user has admin role
    if (req.user?.role !== 'admin') {
      console.log('Admin check failed - not an admin user');
      return res.status(403).json({ error: "Not authorized" });
    }

    // Additional admin verification from database
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, req.user.id))
      .limit(1);

    if (!admin) {
      console.log('Admin check failed - admin record not found');
      return res.status(403).json({ error: "Not authorized" });
    }

    console.log('Admin check passed for user:', req.user.id);
    next();
  } catch (error) {
    console.error('Error in admin check:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Placeholder for email sending function.  Needs to be implemented separately.
async function sendWelcomeEmail(email: string, username: string): Promise<{ sent: boolean; note: string }> {
  return {sent: false, note: "Email sending functionality not implemented"};
}