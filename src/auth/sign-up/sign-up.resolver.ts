import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { SignUpInput, User } from 'src/graphql.schema';
import { UsersService } from 'src/users/users.service';

@Resolver('SingUp')
export class SignUpResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation()
  async signUp(@Args('input') input: SignUpInput): Promise<string> {
    const { userId, username, password } = input;
    const user: User = await this.usersService.createUser({
      userId,
      username,
      password,
    });
    return this.authService.issueToken(user).access_token;
  }
}
