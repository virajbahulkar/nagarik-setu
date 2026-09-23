import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  getLive(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }

  @Get('ready')
  async getReady(): Promise<{ status: string; database: string; timestamp: string }> {
    return this.healthService.getReadiness();
  }
}
