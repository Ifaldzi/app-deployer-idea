import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const { jwt } = config;

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.accessTokenExpiresInMinute },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
