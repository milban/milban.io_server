import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UsersService, User],
  exports: [UsersService],
})
export class UsersModule {}
