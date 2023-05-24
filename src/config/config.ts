import * as dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresInMinute: `${process.env.ACCESS_TOKEN_EXPIRES}m`,
  },
  s3: {
    bucket: process.env.S3_BUCKET,
    host: process.env.S3_HOST,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.REGION || 'us-east-1',
  },
};
