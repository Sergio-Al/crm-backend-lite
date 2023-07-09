import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  first_name: string;

  @IsString()
  @IsOptional()
  last_name?: string;

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
  companyIdEmpresa?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  assignment?: string;
}
