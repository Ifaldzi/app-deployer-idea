import { Persistable } from 'src/common/entities/persistable.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AutoMap } from '@automapper/classes';
import { Application } from 'src/applications/application.entity';
import { USER_APPLICATION_TABLE_NAME } from 'src/common/constants/entity.constant';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ unique: true })
  username: string;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  email: string;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;

  @ManyToMany(() => Application, { onDelete: 'CASCADE' })
  @JoinTable({
    name: USER_APPLICATION_TABLE_NAME,
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'application_id',
      referencedColumnName: 'id',
    },
  })
  applications: Application[];

  @BeforeInsert()
  async generateHashedPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
