import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UserService } from 'src/users/user.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

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
    newApp.users = [authUser];
    console.log(newApp);
    try {
      await this.applicationRepo.save(newApp);
    } catch (error) {
      throw error;
    }
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    const apps = this.applicationRepo.find({
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
        users: {
          id: userId,
        },
      },
    });
    return apps;
  }
}
