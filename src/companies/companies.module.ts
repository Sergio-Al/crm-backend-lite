import { Module, forwardRef } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CompaniesController],
  exports: [CompaniesService],
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService],
})
export class CompaniesModule {}
