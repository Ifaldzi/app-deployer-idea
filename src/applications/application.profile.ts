import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';
import { GetApplicationsDto } from './dto/get-applications.dto';

@Injectable()
export class ApplicationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, CreateApplicationDto, Application);
      createMap(
        mapper,
        Application,
        GetApplicationsDto,
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => s.persistable.createdAt),
        ),
      );
    };
  }
}
