import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class SubCompany {
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

  @ManyToOne(() => Company, (company) => company.subCompanies, { eager: true })
  parentCompany;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
