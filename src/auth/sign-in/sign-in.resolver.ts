import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { SignInInput } from '../../graphql.schema';

@Resolver()
export class SignInResolver {
  constructor(private authService: AuthService) {}

  @Query()
  async signIn(@Args('input') input: SignInInput) {
    const at = new Date();
    return this.authService.login({
      id: String(at),
      userId: input.userId,
      username: input.username,
      password: input.password,
      createdAt: at,
      updatedAt: at,
    });
  }
}
