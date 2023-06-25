import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { users } from './data/data';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async runSeed() {
    await this.usersService.removeAllUsers();
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
