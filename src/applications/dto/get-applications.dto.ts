import { AutoMap } from '@automapper/classes';

export class GetApplicationsDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  logo: string | null;

  @AutoMap()
  description: string | null;

  createdAt?: Date;
}
