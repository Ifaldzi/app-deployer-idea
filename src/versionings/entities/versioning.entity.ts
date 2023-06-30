import { Application } from 'src/applications/entities/application.entity';
import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'versionings' })
export class Versioning {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  version: string;

  @Column()
  fileKey: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;

  @ManyToOne(() => Application, (application) => application.versionings, {
    onDelete: 'CASCADE',
  })
  application: Application;
}
