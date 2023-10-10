import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Versioning } from './entities/versioning.entity';
import { Repository } from 'typeorm';
import { AddNewVersionDto } from './dto/add-new-version.dto';
import { ApplicationService } from 'src/applications/application.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class VersioningService {
  constructor(
    @InjectRepository(Versioning)
    private readonly versioningRepo: Repository<Versioning>,
    private readonly applicationService: ApplicationService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async addNewVersionInApplication(
    applicationId: string,
    data: AddNewVersionDto,
  ): Promise<void> {
    try {
      const application = await this.applicationService.getApplicationOrFail(
        applicationId,
      );
      const newVersionData = this.mapper.map(
        data,
        AddNewVersionDto,
        Versioning,
      );
      newVersionData.application = application;

      await this.versioningRepo.save(newVersionData);
    } catch (error) {
      throw error;
    }
  }
}
