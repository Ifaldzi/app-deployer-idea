import { AutoMap } from '@automapper/classes';
import { Persistable } from 'src/common/entities/persistable.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'applications' })
export class Application {
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

  @ManyToMany(() => User, (user) => user.applications)
  users: User[];
}
