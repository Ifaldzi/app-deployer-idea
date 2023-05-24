import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('files')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('file cannot be empty');

    const uploadedFile = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname,
    );

    return {
      url: uploadedFile.Location,
      key: uploadedFile.Key,
      eTag: uploadedFile.ETag,
    };
  }
}
