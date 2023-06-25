import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Company])],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
