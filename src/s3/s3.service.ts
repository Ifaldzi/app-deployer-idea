import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import config from 'src/config/config';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { GetFileDto } from './dto/get-file.dto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const { s3: s3Config } = config;

@Injectable()
export class S3Service {
  private readonly s3 = new S3Client({
    credentials: {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
    },
    endpoint: s3Config.host,
    forcePathStyle: true,
    region: s3Config.region,
  });

  async uploadFile(
    file: Express.Multer.File,
    isPublic = false,
  ): Promise<UploadFileResponseDto> {
    try {
      const fileName = file.originalname;
      const splittedName = fileName.split('.');
      const fileExtension = splittedName.pop();
      let fileKey = `${splittedName
        .join()
        .replace(' ', '_')}_${Date.now()}.${fileExtension}`;

      if (isPublic) fileKey = `public/${fileKey}`;

      const response = await this.s3.send(
        new PutObjectCommand({
          Bucket: s3Config.bucket,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      console.log(response);
      return {
        key: fileKey,
        eTag: response.ETag,
        location: `${s3Config.host}/${s3Config.bucket}/${fileKey}`,
      } as UploadFileResponseDto;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFile(key: string): Promise<GetFileDto> {
    const signedUrl = await this.getFileUrl(key, 30);

    const fileName = key.split('/').pop();

    return {
      key,
      fileName,
      url: signedUrl,
    } as GetFileDto;
  }

  async getFileUrl(key: string, expires = 60) {
    try {
      const url = await getSignedUrl(
        this.s3,
        new GetObjectCommand({
          Bucket: s3Config.bucket,
          Key: key,
        }),
        { expiresIn: 60 * expires },
      );
      return url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
