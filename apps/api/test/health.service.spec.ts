import { HealthService } from '../src/health/health.service';

describe('HealthService', () => {
  it('maps healthy database state to ok/up', async () => {
    const service = new HealthService({ checkConnection: jest.fn().mockResolvedValue(true) } as never);

    const result = await service.getReadiness();

    expect(result.status).toBe('ok');
    expect(result.database).toBe('up');
  });

  it('maps failed database state to degraded/down', async () => {
    const service = new HealthService({ checkConnection: jest.fn().mockResolvedValue(false) } as never);

    const result = await service.getReadiness();

    expect(result.status).toBe('degraded');
    expect(result.database).toBe('down');
  });
});
