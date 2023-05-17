import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user?.checkPassword(password)) {
      const payload = { username: user.username, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
