import { AutoMap } from '@automapper/classes';

export class AddNewVersionDto {
  @AutoMap()
  version: string;

  @AutoMap()
  fileKey: string;

  @AutoMap()
  description?: string;
}
