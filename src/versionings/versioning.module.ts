import { Module } from '@nestjs/common';
import { VersioningController } from './versioning.controller';
import { VersioningService } from './versioning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Versioning } from './entities/versioning.entity';
import { ApplicationModule } from 'src/applications/application.module';
import { VersioningProfile } from './versioning.profile';

@Module({
  imports: [ApplicationModule, TypeOrmModule.forFeature([Versioning])],
  controllers: [VersioningController],
  providers: [VersioningService, VersioningProfile],
})
export class VersioningModule {}
