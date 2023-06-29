import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { SubCompanyModule } from './sub-company/sub-company.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CompaniesModule,
    SubCompanyModule,
    UsersModule,
    SeedModule,
    FilesModule,
  ],
})
export class AppModule {}
