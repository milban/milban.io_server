import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { PostsInput, User } from '../../graphql.schema';
import { Post } from '@prisma/client';
import { UsersService } from '../../users/users.service';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Query('posts')
  @UseGuards(GqlAuthGuard)
  async posts(@CurrentUser() user: User, @Args('input') input: PostsInput) {
    const { cursor, take } = input;
    const { id: authorId } = user;
    const posts = await this.postsService.posts({
      cursor,
      take,
      skip: cursor && 1,
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      totalCount: posts.length,
      edges: posts,
    };
  }

  @ResolveField('author')
  async author(@Parent() post: Post) {
    const { authorId } = post;
    return this.usersService.user({
      id: authorId,
    });
  }
}
