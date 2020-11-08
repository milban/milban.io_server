import { User as IUser } from '../graphql.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class User implements IUser {
  constructor(
    private readonly _createdAt: Date,
    private readonly _id: string,
    private readonly _password: string,
    private readonly _updatedAt: Date,
    private readonly _userId: string,
    private readonly _username: string,
  ) {}

  get createdAt(): Date {
    return this._createdAt;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get userId(): string {
    return this._userId;
  }

  get username(): string {
    return this._username;
  }
}
