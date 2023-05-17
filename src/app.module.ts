import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/typeorm.config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class AppModule {}
