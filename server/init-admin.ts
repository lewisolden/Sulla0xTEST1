import { db } from '@db';
import { adminUsers } from '@db/schema';
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createInitialAdmin() {
  try {
    const hashedPassword = await hashPassword("admin123");
    const now = new Date();
    
    const [admin] = await db
      .insert(adminUsers)
      .values({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: now,
        updatedAt: now
      })
      .returning();
      
    console.log("Admin user created successfully:", admin.id);
  } catch (error) {
    console.error("Failed to create admin user:", error);
  }
}

createInitialAdmin();
