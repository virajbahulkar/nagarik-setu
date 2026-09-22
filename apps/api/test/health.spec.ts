import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { HealthController } from '../src/health/health.controller';
import { HealthService } from '../src/health/health.service';

describe('HealthController', () => {
  let app: INestApplication;
  const healthServiceMock = {
    getReadiness: jest.fn()
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: healthServiceMock }]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health/live (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/health/live');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('/health/ready (GET)', async () => {
    healthServiceMock.getReadiness.mockResolvedValueOnce({
      status: 'ok',
      database: 'up',
      timestamp: '2026-01-01T00:00:00.000Z'
    });

    const response = await request(app.getHttpServer()).get('/health/ready');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.database).toBe('up');
  });

  it('/health/ready (GET) degraded path', async () => {
    healthServiceMock.getReadiness.mockResolvedValueOnce({
      status: 'degraded',
      database: 'down',
      timestamp: '2026-01-01T00:00:00.000Z'
    });

    const response = await request(app.getHttpServer()).get('/health/ready');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('degraded');
    expect(response.body.database).toBe('down');
  });
});
