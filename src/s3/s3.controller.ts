import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('files')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async upload(
    @Body() data: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('file cannot be empty');

    const uploadedFile = await this.s3Service.uploadFile(file, data.isPublic);

    return {
      location: uploadedFile.Location,
      key: uploadedFile.Key,
      eTag: uploadedFile.ETag,
    };
  }
}
