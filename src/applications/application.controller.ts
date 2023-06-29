import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetApplicationsDto } from './dto/get-applications.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination/paginaton-query.dto';
import { PaginationDto } from 'src/common/dto/pagination/Pagination.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() body: CreateApplicationDto, @Request() req) {
    await this.applicationService.createNewApplication(body, req.user.id);
  }

  @Get()
  async getApplicationsList(
    @Request() req,
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginationDto<GetApplicationsDto>> {
    return this.applicationService.getApplicationsByUser(
      req.user.id,
      paginationQueryDto,
    );
  }
}
