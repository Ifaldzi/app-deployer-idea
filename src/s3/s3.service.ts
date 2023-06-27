import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import config from 'src/config/config';

const { s3: s3Config } = config;

@Injectable()
export class S3Service {
  private s3 = new AWS.S3({
    credentials: {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
    },
    endpoint: s3Config.host,
    s3ForcePathStyle: true,
    region: s3Config.region,
  });

  async uploadFile(
    file: Express.Multer.File,
    isPublic = false,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    try {
      const fileName = file.originalname;
      const splittedName = fileName.split('.');
      const fileExtension = splittedName.pop();
      const fileKey = `${splittedName
        .join()
        .replace(' ', '_')}_${Date.now()}.${fileExtension}`;
      console.log(isPublic);
      console.log(isPublic ? `public/${fileKey}` : fileKey);

      const response = await this.s3
        .upload({
          Bucket: s3Config.bucket,
          Key: isPublic ? `public/${fileKey}` : fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFileUrl(key: string) {
    try {
      const response = await this.s3.getSignedUrlPromise('getObject', {
        Bucket: s3Config.bucket,
        Key: key,
        Expires: 60 * 60 * 1,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
