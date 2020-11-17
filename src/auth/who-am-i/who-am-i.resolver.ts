import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../../users/users.service';
import { User } from '../../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth.guard';
import { CurrentUser } from '../decorator/current-user.decorator';

@Resolver('WhoAmI')
export class WhoAmIResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.username);
  }
}