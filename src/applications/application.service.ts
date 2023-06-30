import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UserService } from 'src/users/user.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PaginationQueryDto } from 'src/common/dto/pagination/paginaton-query.dto';
import { PaginationDto } from 'src/common/dto/pagination/Pagination.dto';
import { PaginationMetaDto } from 'src/common/dto/pagination/pagination-meta.dto';
import { GetApplicationsDto } from './dto/get-applications.dto';
import { UserApplication } from './entities/user-application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    private readonly userService: UserService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async createNewApplication(
    data: CreateApplicationDto,
    userId: string,
  ): Promise<void> {
    const authUser = await this.userService.getUserById(userId);
    if (!authUser) {
      throw new NotFoundException('User not found');
    }

    const newApp = this.mapper.map(data, CreateApplicationDto, Application);
    const userApplication = new UserApplication();
    userApplication.user = authUser;
    newApp.userApplications = [userApplication];
    console.log(newApp);
    try {
      await this.applicationRepo.save(newApp);
    } catch (error) {
      throw error;
    }
  }

  async getApplicationsByUser(
    userId: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginationDto<GetApplicationsDto>> {
    const [apps, itemCount] = await this.applicationRepo.findAndCount({
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        persistable: {
          createdAt: true,
        },
      },
      where: {
        userApplications: {
          userId: userId,
        },
      },
      take: paginationQuery.limit,
      skip: paginationQuery.offset,
    });

    return new PaginationDto(
      this.mapper.mapArray(apps, Application, GetApplicationsDto),
      new PaginationMetaDto(paginationQuery, itemCount),
    );
  }
}
