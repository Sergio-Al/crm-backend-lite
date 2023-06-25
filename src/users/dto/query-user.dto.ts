import { IsOptional, IsString, MinLength } from 'class-validator';

export class QueryUser {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  iddivision_c?: string;

  @IsString()
  @IsOptional()
  idregional_c?: string;

  @IsString()
  @IsOptional()
  idamercado_c?: string;

  @IsString()
  @IsOptional()
  company_id?: string;
}
