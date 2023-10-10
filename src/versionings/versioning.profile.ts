import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { AddNewVersionDto } from './dto/add-new-version.dto';
import { Versioning } from './entities/versioning.entity';

@Injectable()
export class VersioningProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, AddNewVersionDto, Versioning);
    };
  }
}
