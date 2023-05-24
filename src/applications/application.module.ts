import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { UserModule } from 'src/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationProfile } from './application.profile';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Application])],
  providers: [ApplicationService, ApplicationProfile],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
