import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { IssuesModule } from './modules/issues/issues.module';
import { JurisdictionsModule } from './modules/jurisdictions/jurisdictions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    IssuesModule,
    JurisdictionsModule
  ]
})
export class AppModule {}
