import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  size: string;

  @Column('text', { nullable: true })
  extension: string;

  @Column('text', { nullable: true })
  fecha_inicio_vigencia: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  prefijo_doc: string;

  @Column('text', { nullable: true })
  registro_cambio: string;

  @Column('text', { nullable: true })
  fecha_registro: string;
}
