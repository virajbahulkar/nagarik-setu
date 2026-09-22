# NagrikSetu

NagrikSetu (Citizen Bridge) is a civic grievance and lost-property platform for Indian cities.

## Phase 1 Foundation (Monorepo)

```
apps/
  api/      NestJS 11 API
  web/      Next.js 16 web portal
  mobile/   Expo SDK 55 mobile app
packages/
  shared/   Shared interfaces and DTOs
  database/ SQL migrations and seed data
  config/   Runtime env schema
```

## Quick Start (Docker Compose)

1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start platform services:
   ```bash
   docker compose up --build
   ```
4. Run migrations and seed data:
   ```bash
   docker compose exec api npm run db:migrate
   docker compose exec api npm run db:seed
   ```

## Services

- API: http://localhost:3000
- API health live: http://localhost:3000/health/live
- API health ready: http://localhost:3000/health/ready
- Web: http://localhost:3001
- PostgreSQL/PostGIS: localhost:5432
- Redis: localhost:6379
- MinIO API: http://localhost:9000
- MinIO Console: http://localhost:9001

## Notes

- All data in `packages/database/seeds` is **synthetic development data only**.
- Do not use development credentials in production.
