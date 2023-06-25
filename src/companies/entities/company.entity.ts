import { SubCompany } from 'src/sub-company/entities/sub-company.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('text', { nullable: true })
  assigned_user: string;

  @Column('text', { nullable: true })
  comment: string;

  @OneToMany(() => SubCompany, (subCompany) => subCompany.parentCompany)
  subCompanies: SubCompany[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
