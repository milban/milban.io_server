import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { CreatePostResolver } from './resolvers/create-post.resolver';
import { UsersService } from '../users/users.service';
import { PostsResolver } from './resolvers/posts.resolver';

@Module({
  providers: [
    PostsService,
    PrismaService,
    UsersService,
    CreatePostResolver,
    PostsResolver,
  ],
})
export class PostsModule {}
