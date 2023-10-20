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
import { GetApplicationDetailDto } from './dto/get-application-detail.dto';

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
      createMap(
        mapper,
        Application,
        GetApplicationDetailDto,
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => s.persistable.createdAt),
        ),
        forMember(
          (d) => d.versions,
          mapFrom((s) =>
            s.versionings.map((v) => {
              return {
                id: v.id,
                version: v.version,
                description: v.description,
              };
            }),
          ),
        ),
      );
    };
  }
}
