import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CompaniesModule],
  providers: [UsersService],
})
export class UsersModule {}
