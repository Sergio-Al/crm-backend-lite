import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { users } from './data/data';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async runSeed() {
    await this.insertUsers();

    return 'seed executed';
  }

  private async insertUsers() {
    const insertPromises = [];
    users.forEach((user) => {
      insertPromises.push(this.usersService.create(user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
