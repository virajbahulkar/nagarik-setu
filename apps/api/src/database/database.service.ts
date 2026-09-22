import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool, type PoolClient } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT ?? 5432),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  });

  async onModuleInit(): Promise<void> {
    const isConnected = await this.checkConnection();
    if (!isConnected) {
      throw new Error('Database connection failed during API bootstrap');
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  async checkConnection(): Promise<boolean> {
    let client: PoolClient | undefined;
    try {
      client = await this.pool.connect();
      await client.query('SELECT 1');
      return true;
    } catch {
      return false;
    } finally {
      client?.release();
    }
  }

  getPool(): Pool {
    return this.pool;
  }
}
