import { Persistable } from 'src/common/entities/persistable.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AutoMap } from '@automapper/classes';

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

  @BeforeInsert()
  async generateHashedPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
