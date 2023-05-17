import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/typeorm.config';
import { UserModule } from './users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
})
export class AppModule {}
