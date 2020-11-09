import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'milban01',
        password: '123',
        username: 'milban01',
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'milban02',
        username: 'john',
        password: 'changeme',
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'milban03',
        username: 'chris',
        password: 'secret',
      },
      {
        id: '4',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'milban04',
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
