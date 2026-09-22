import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Pool } from 'pg';

const repositoryRoot = resolve(__dirname, '../../../..');
const migrationsDir = join(repositoryRoot, 'packages/database/migrations');
const seedsDir = join(repositoryRoot, 'packages/database/seeds');

const createPool = (): Pool =>
  new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT ?? 5432),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  });

export const runMigrations = async (): Promise<void> => {
  const pool = createPool();
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename text PRIMARY KEY,
        executed_at timestamptz NOT NULL DEFAULT now()
      );
    `);

    const files = readdirSync(migrationsDir).filter((file) => file.endsWith('.sql')).sort();

    for (const file of files) {
      const alreadyApplied = await pool.query('SELECT filename FROM schema_migrations WHERE filename = $1', [file]);
      if (alreadyApplied.rowCount && alreadyApplied.rowCount > 0) {
        continue;
      }

      const sql = readFileSync(join(migrationsDir, file), 'utf-8');
      await pool.query('BEGIN');
      try {
        await pool.query(sql);
        await pool.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
        await pool.query('COMMIT');
      } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
      }
    }
  } finally {
    await pool.end();
  }
};

export const runSeed = async (): Promise<void> => {
  const pool = createPool();
  try {
    const files = readdirSync(seedsDir).filter((file) => file.endsWith('.sql')).sort();
    for (const file of files) {
      const sql = readFileSync(join(seedsDir, file), 'utf-8');
      await pool.query(sql);
    }
  } finally {
    await pool.end();
  }
};
