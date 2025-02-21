import { adminUsers } from '@db/schema';
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq, sql } from 'drizzle-orm';
import fs from 'fs';
import { db, withTransaction, verifyDatabaseState } from '../db/utils';

const scryptAsync = promisify(scrypt);

// Environment validation
const ALLOWED_RESET_ENVIRONMENTS = ['development', 'test'];
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Backup verification flag
const BACKUP_VERIFICATION_FILE = '.db_backup_verified';

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function verifyAdminDatabaseState() {
  try {
    // First verify general database health
    await verifyDatabaseState();

    // Then check for existing users
    const result = await withTransaction(
      async () => {
        return await db
          .select({ count: sql<number>`count(*)` })
          .from(adminUsers);
      },
      { operationType: 'read' }
    );

    if (result[0].count > 0 && !fs.existsSync(BACKUP_VERIFICATION_FILE)) {
      console.error(`
        ⚠️  WARNING: Database already contains ${result[0].count} admin users.
        To prevent accidental data loss, this operation has been blocked.

        If you really need to reinitialize the database:
        1. Ensure you have a backup of your data
        2. Create a file named '${BACKUP_VERIFICATION_FILE}' to confirm
        3. Run this script again

        ⚠️  THIS OPERATION CANNOT BE UNDONE!
      `);
      process.exit(1);
    }
  } catch (error) {
    console.error("Failed to verify database state:", error);
    process.exit(1);
  }
}

async function createInitialAdmin() {
  try {
    // Environment check
    if (!ALLOWED_RESET_ENVIRONMENTS.includes(ENVIRONMENT)) {
      console.error(`
        ⚠️  Database initialization blocked in '${ENVIRONMENT}' environment.
        This operation is only allowed in: ${ALLOWED_RESET_ENVIRONMENTS.join(', ')}

        If you need to run this in production:
        1. Create a backup of your database
        2. Set NODE_ENV to 'development'
        3. Create the '${BACKUP_VERIFICATION_FILE}' file
        4. Run this script again
      `);
      process.exit(1);
    }

    console.log('Starting admin user initialization...');
    console.log(`Environment: ${ENVIRONMENT}`);

    // Verify database state before proceeding
    await verifyAdminDatabaseState();

    // Perform admin creation within a transaction
    const newAdmin = await withTransaction(
      async () => {
        // Check if admin already exists
        const [existingAdmin] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.username, "admin"))
          .limit(1);

        if (existingAdmin) {
          console.log("Admin user already exists:", existingAdmin.id);
          return existingAdmin;
        }

        // Create new admin user
        console.log('Creating new admin user...');
        const hashedPassword = await hashPassword("admin123");

        const [admin] = await db
          .insert(adminUsers)
          .values({
            username: "admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
          })
          .returning();

        return admin;
      },
      { 
        operationType: 'write',
        requireBackupVerification: true 
      }
    );

    console.log("Admin user created successfully:", {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email
    });

    // Clean up verification file if it exists
    if (fs.existsSync(BACKUP_VERIFICATION_FILE)) {
      fs.unlinkSync(BACKUP_VERIFICATION_FILE);
      console.log(`Removed verification file: ${BACKUP_VERIFICATION_FILE}`);
    }
  } catch (error) {
    console.error("Failed to create admin user:", error);
    throw error;
  }
}

// Add startup banner
console.log(`
🛡️  Database Initialization Script
==============================
Environment: ${ENVIRONMENT}
Allowed environments: ${ALLOWED_RESET_ENVIRONMENTS.join(', ')}
Backup verification required: ${!fs.existsSync(BACKUP_VERIFICATION_FILE)}
`);

// Run the initialization
createInitialAdmin()
  .then(() => console.log('Admin initialization completed'))
  .catch(error => {
    console.error('Admin initialization failed:', error);
    process.exit(1);
  });