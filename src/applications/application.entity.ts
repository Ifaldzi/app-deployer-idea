import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ nullable: true })
  logo: string | null;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;
}
