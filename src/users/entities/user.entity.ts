import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name;

  @Column('text', { nullable: true })
  iddivision_c;

  @Column('text', { nullable: true })
  idregional_c;

  @Column('text', { nullable: true })
  idamercado_c;

  @ManyToOne(() => Company, (subCompany) => subCompany.users)
  company: Company;
}
