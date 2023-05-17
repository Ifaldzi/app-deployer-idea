import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    console.log(req.user);

    const users = await this.userService.findAll();
    return users;
  }
}
