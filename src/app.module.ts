import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/typeorm.config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ApplicationModule } from './applications/application.module';
import { S3Module } from './s3/s3.module';
import { VersioningModule } from './versionings/versioning.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    AuthModule,
    ApplicationModule,
    S3Module,
    VersioningModule,
  ],
})
export class AppModule {}
