import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(private readonly users: User[]) {
    this.users = users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
