import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
