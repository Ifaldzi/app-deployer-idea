import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  @Transform(({ value }) => value === 'true')
  isPublic: boolean;
}
