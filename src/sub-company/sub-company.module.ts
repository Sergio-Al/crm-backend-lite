import { Module } from '@nestjs/common';
import { SubCompanyService } from './sub-company.service';
import { SubCompanyController } from './sub-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCompany } from './entities/sub-company.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  controllers: [SubCompanyController],
  imports: [TypeOrmModule.forFeature([SubCompany, Company])],
  providers: [SubCompanyService],
})
export class SubCompanyModule {}
