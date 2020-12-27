import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { CreatePostResolver } from './resolvers/create-post.resolver';
import { UsersService } from '../users/users.service';

@Module({
  providers: [PostsService, PrismaService, UsersService, CreatePostResolver],
})
export class PostsModule {}
