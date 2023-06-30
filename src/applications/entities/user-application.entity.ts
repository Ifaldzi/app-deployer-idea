import { USER_APPLICATION_TABLE_NAME } from 'src/common/constants/entity.constant';
import { Persistable } from 'src/common/entities/persistable.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Application } from './application.entity';
import { User } from 'src/users/user.entity';

@Entity(USER_APPLICATION_TABLE_NAME)
export class UserApplication {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  applicationId: string;

  @Column(() => Persistable, { prefix: false })
  persistable: Persistable;

  @ManyToOne(() => Application, (application) => application.userApplications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  application: Application;

  @ManyToOne(() => User, (user) => user.userApplications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
