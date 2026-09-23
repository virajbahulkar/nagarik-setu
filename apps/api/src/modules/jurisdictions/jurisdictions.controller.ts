import { Controller, Get } from '@nestjs/common';
import { JurisdictionsService } from './jurisdictions.service';

@Controller('jurisdictions')
export class JurisdictionsController {
  constructor(private readonly jurisdictionsService: JurisdictionsService) {}

  @Get()
  findAll(): unknown[] {
    return this.jurisdictionsService.findAll();
  }
}
