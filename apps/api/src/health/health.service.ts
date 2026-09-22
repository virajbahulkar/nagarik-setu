import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class HealthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getReadiness(): Promise<{ status: string; database: string; timestamp: string }> {
    const dbOk = await this.databaseService.checkConnection();
    return {
      status: dbOk ? 'ok' : 'degraded',
      database: dbOk ? 'up' : 'down',
      timestamp: new Date().toISOString()
    };
  }
}
