import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @AutoMap()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  logo?: string;
}
