import { AutoMap } from '@automapper/classes';
import { Persistable } from 'src/common/entities/persistable.entity';
import { Versioning } from 'src/versionings/entities/versioning.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserApplication } from './user-application.entity';

@Entity({ name: 'applications' })
export class Application {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @AutoMap()
  @Column({ nullable: true })
  logo: string | null;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;

  @OneToMany(
    () => UserApplication,
    (userApplication) => userApplication.application,
    { cascade: true },
  )
  userApplications: UserApplication[];

  @OneToMany(() => Versioning, (versioning) => versioning.application)
  versionings: Versioning[];
}
