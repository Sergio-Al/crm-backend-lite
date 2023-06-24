import { Module } from '@nestjs/common';
import { SubCompanyService } from './sub-company.service';
import { SubCompanyController } from './sub-company.controller';

@Module({
  controllers: [SubCompanyController],
  providers: [SubCompanyService]
})
export class SubCompanyModule {}
