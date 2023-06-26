import { IsOptional, IsString, MinLength } from 'class-validator';

export class QuerySubCompany {
  @IsString()
  @IsOptional()
  company_id?: string;
}
