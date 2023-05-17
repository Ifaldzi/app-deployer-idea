import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
