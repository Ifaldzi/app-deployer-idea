import { USER_APPLICATION_TABLE_NAME } from 'src/common/constants/entity.constant';
import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity(USER_APPLICATION_TABLE_NAME)
export class UserApplication {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  application_id: string;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;
}
