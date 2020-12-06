import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { SignInInput, User } from '../../graphql.schema';

@Resolver('SignIn')
export class SignInResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async signIn(@Args('input') input: SignInInput): Promise<string> {
    const user: User = await this.authService.validateUser(
      input.userId,
      input.password,
    );
    return this.authService.issueToken(user).access_token;
  }
}
