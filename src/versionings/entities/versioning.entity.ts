import { AutoMap } from '@automapper/classes';
import { Application } from 'src/applications/entities/application.entity';
import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'versionings' })
export class Versioning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column()
  version: string;

  @AutoMap()
  @Column()
  fileKey: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;

  @ManyToOne(() => Application, (application) => application.versionings, {
    onDelete: 'CASCADE',
  })
  application: Application;
}
