import { AutoMap } from '@automapper/classes';

export class GetApplicationDetailDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  logo?: string;

  @AutoMap()
  description?: string;

  createdAt: Date;

  versions: Version[];
}

interface Version {
  id: string;
  version: string;
  description: string;
}
