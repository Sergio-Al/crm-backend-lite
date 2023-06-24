import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id_empresa: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  razon_social_c;

  @Column('text', { nullable: true })
  email1;

  @Column('text', { nullable: true })
  direccion_c;

  @Column('text', { nullable: true })
  resolucion_ministerial_c;

  @Column('text', { nullable: true })
  ownership;

  @Column('text', { nullable: true })
  phone_office;

  @Column('text', { nullable: true })
  phone_alternate;

  @Column('text', { nullable: true })
  website;

  @Column('text', { nullable: true })
  identificacion_fiscal_c;
}
