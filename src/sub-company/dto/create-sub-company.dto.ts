import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateSubCompanyDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  razon_social_c: string;

  @IsString()
  @IsOptional()
  email1: string;

  @IsString()
  @IsOptional()
  direccion_c: string;

  @IsString()
  @IsOptional()
  resolucion_ministerial_c: string;

  @IsString()
  @IsOptional()
  ownership: string;

  @IsString()
  @IsOptional()
  phone_office: string;

  @IsString()
  @IsOptional()
  phone_alternate: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  identificacion_fiscal_c: string;

  @IsString()
  @IsOptional()
  assigned_user_id: string;

  @IsString()
  @IsOptional()
  hance_empresa_id_c: string;
}
