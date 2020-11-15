import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { SignInInput, User } from '../../graphql.schema';

@Resolver('SignIn')
export class SignInResolver {
  constructor(private authService: AuthService) {}

  @Query()
  async signIn(@Args('input') input: SignInInput): Promise<string> {
    const user: Omit<User, 'password'> = await this.authService.validateUser(
      input.userId,
      input.password,
    );
    return this.authService.login(user)?.access_token;
  }
}
