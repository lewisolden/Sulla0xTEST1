import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

const BACKUP_VERIFICATION_FILE = '.db_backup_verified';
const ALLOWED_ENVIRONMENTS = ['development', 'test', 'production'];
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Validate environment and configuration
if (!ALLOWED_ENVIRONMENTS.includes(ENVIRONMENT)) {
  throw new Error(`Invalid environment: ${ENVIRONMENT}. Must be one of: ${ALLOWED_ENVIRONMENTS.join(', ')}`);
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Connection pool configuration with safety limits
const poolConfig = {
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // How long a connection can be idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
};

// Create connection pool with logging
const sql = neon(process.env.DATABASE_URL);
const pool = new Pool(poolConfig);

pool.on('connect', (client) => {
  console.log('New database connection established', { 
    environment: ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

// Database operation wrapper with logging
export async function withTransaction<T>(
  operation: () => Promise<T>,
  options: { 
    requireBackupVerification?: boolean;
    operationType: 'read' | 'write' | 'delete';
  } = { operationType: 'read' }
) {
  const { requireBackupVerification = false, operationType } = options;

  // Additional safety check for destructive operations
  if (
    operationType === 'delete' && 
    ENVIRONMENT === 'production' &&
    requireBackupVerification &&
    !fs.existsSync(path.join(process.cwd(), BACKUP_VERIFICATION_FILE))
  ) {
    throw new Error(`
      ⚠️  Destructive operation blocked in production environment.
      To proceed:
      1. Ensure you have a backup
      2. Create ${BACKUP_VERIFICATION_FILE} to confirm
      3. Try again
    `);
  }

  // Log operation start
  console.log(`Database operation started`, {
    type: operationType,
    environment: ENVIRONMENT,
    timestamp: new Date().toISOString()
  });

  try {
    const result = await operation();
    return result;
  } catch (error) {
    console.error(`Database operation failed`, {
      type: operationType,
      error,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

// Export configured database instance
export const db = drizzle(sql);

// Helper to verify database state
export async function verifyDatabaseState() {
  return withTransaction(
    async () => {
      // Perform basic health check
      const result = await sql`SELECT 1`;
      if (!result) {
        throw new Error('Database health check failed');
      }
      return true;
    },
    { operationType: 'read' }
  );
}
