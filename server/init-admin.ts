import { db } from '@db';
import { adminUsers } from '@db/schema';
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq } from 'drizzle-orm';

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createInitialAdmin() {
  try {
    // Check if admin already exists
    const [existingAdmin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, "admin"))
      .limit(1);

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create new admin user
    const hashedPassword = await hashPassword("admin123");

    const [admin] = await db
      .insert(adminUsers)
      .values({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin" as const,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    console.log("Admin user created successfully:", admin.id);
  } catch (error) {
    console.error("Failed to create admin user:", error);
  }
}

// Run the initialization
createInitialAdmin();