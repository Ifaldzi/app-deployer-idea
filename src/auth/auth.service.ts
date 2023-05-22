import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (await user?.checkPassword(password)) {
      const payload = { username: user.username, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException();
  }

  async register(data: RegisterDto): Promise<void> {
    const newUser: User = this.mapper.map(data, RegisterDto, User);

    try {
      await this.userService.createNewUser(newUser);
    } catch (error) {
      throw error;
    }
  }
}
