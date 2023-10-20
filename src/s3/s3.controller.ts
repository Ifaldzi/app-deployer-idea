import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
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
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { GetFileDto } from './dto/get-file.dto';

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
  ): Promise<UploadFileResponseDto> {
    if (!file) throw new BadRequestException('file cannot be empty');

    const uploadedFile = await this.s3Service.uploadFile(file, data.isPublic);

    return uploadedFile;
  }

  @Get('/:key')
  async GetFile(@Param('key') key: string): Promise<GetFileDto> {
    return this.s3Service.getFile(key);
  }
}
