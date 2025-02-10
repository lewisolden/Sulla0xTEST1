import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { type Express } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { users, adminUsers, type SelectUser, type SelectAdminUser, insertUserSchema, insertAdminUserSchema } from "@db/schema";
import { db } from "@db";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);
const crypto = {
  hash: async (password: string) => {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  },
  compare: async (suppliedPassword: string, storedPassword: string) => {
    const [hashedPassword, salt] = storedPassword.split(".");
    if (!hashedPassword || !salt) {
      return false;
    }
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  },
};

declare global {
  namespace Express {
    interface User extends SelectUser {}
    interface AdminUser extends SelectAdminUser {}
  }
}

// Middleware to check if user is an admin
export const requireAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, req.user.id))
    .limit(1);

  if (!admin) {
    return res.status(403).json({ error: "Not authorized" });
  }

  next();
};

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

  // Regular user authentication strategy
  passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isMatch = await crypto.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Admin authentication strategy
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
      const isMatch = await crypto.compare(password, admin.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect admin password." });
      }
      return done(null, admin);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user: any, done) => {
    done(null, { id: user.id, isAdmin: !!user.role });
  });

  passport.deserializeUser(async (data: { id: number, isAdmin: boolean }, done) => {
    try {
      if (data.isAdmin) {
        const [admin] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.id, data.id))
          .limit(1);
        done(null, admin);
      } else {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, data.id))
          .limit(1);
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  });

  // Admin login route
  app.post("/api/admin/login", (req, res, next) => {
    passport.authenticate("admin-local", (err: any, admin: Express.AdminUser | false, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }

      if (!admin) {
        return res.status(400).json({ error: info.message ?? "Admin login failed" });
      }

      req.logIn(admin, (err) => {
        if (err) {
          return next(err);
        }

        return res.json({
          message: "Admin login successful",
          admin: { id: admin.id, username: admin.username, role: admin.role },
        });
      });
    })(req, res, next);
  });

  // Regular authentication routes
  app.post("/api/register", async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: result.error.issues.map((issue) => issue.message).join(", ") });
      }

      const { username, email, password } = result.data;

      const [existingUsername] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (existingUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const [existingEmail] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await crypto.hash(password);

      const [newUser] = await db
        .insert(users)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning();

      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).json({
          message: "Registration successful",
          user: { id: newUser.id, username: newUser.username },
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
          user: { id: user.id, username: user.username },
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

  // New admin registration route (protected)
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

      const hashedPassword = await crypto.hash(password);

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