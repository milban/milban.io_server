import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { PostResolver } from './resolvers/post.resolver';
import { PostsByCursorNodeResolver } from './resolvers/posts-by-cursor-node.resolver';

@Module({
  providers: [
    PostsService,
    PrismaService,
    UsersService,
    PostResolver,
    PostsByCursorNodeResolver,
  ],
})
export class PostsModule {}
