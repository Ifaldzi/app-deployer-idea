import { AutoMap } from '@automapper/classes';

export class RegisterDto {
  @AutoMap()
  name: string;

  @AutoMap()
  username: string;

  @AutoMap()
  email: string;

  @AutoMap()
  password: string;
}
