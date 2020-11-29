import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.Strategy';
import { SignInResolver } from './sign-in/sign-in.resolver';
import { WhoAmIResolver } from './who-am-i/who-am-i.resolver';
import { SignUpResolver } from 'src/auth/sign-up/sign-up.resolver';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    SignInResolver,
    WhoAmIResolver,
    SignUpResolver,
  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
