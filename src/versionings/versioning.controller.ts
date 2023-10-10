import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { VersioningService } from './versioning.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddNewVersionDto } from './dto/add-new-version.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Versionings')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller()
export class VersioningController {
  constructor(private readonly versioningService: VersioningService) {}

  @Post('applications/:applicationId/versions')
  async addNewVersion(
    @Param('applicationId') applicationId: string,
    @Body() data: AddNewVersionDto,
  ) {
    await this.versioningService.addNewVersionInApplication(
      applicationId,
      data,
    );
  }
}
