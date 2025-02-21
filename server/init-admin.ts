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
    console.log('Starting admin user initialization...');

    // Check if admin already exists
    const [existingAdmin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, "admin"))
      .limit(1);

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.id);
      return;
    }

    // Create new admin user
    console.log('Creating new admin user...');
    const hashedPassword = await hashPassword("admin123");

    const [newAdmin] = await db
      .insert(adminUsers)
      .values({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      })
      .returning();

    console.log("Admin user created successfully:", {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email
    });
  } catch (error) {
    console.error("Failed to create admin user:", error);
    throw error; // Re-throw to ensure we see the full error
  }
}

// Run the initialization
console.log('Running admin initialization script...');
createInitialAdmin()
  .then(() => console.log('Admin initialization completed'))
  .catch(error => {
    console.error('Admin initialization failed:', error);
    process.exit(1);
  });