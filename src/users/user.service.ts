import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }

  async createNewUser(user: User): Promise<void> {
    await this.userRepo.save(user);
  }

  getUserById(id: string): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }
}
