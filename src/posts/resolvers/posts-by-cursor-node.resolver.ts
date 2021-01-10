import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import {
  PostsByCursorConnection,
  PostsByCursorNode,
} from '../../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { Post } from '@prisma/client';

@Resolver('PostsByCursorNode')
export class PostsByCursorNodeResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('postsByCursor')
  @UseGuards(GqlAuthGuard)
  async getPostsByCursor(): Promise<PostsByCursorNode> {
    return {
      id: 'postsByCursor',
    };
  }

  @ResolveField('posts')
  async getPosts(
    @Args('first') first?: number,
    @Args('last') last?: number,
    @Args('before') before?: string,
    @Args('after') after?: string,
  ): Promise<PostsByCursorConnection> {
    const posts: Post[] = await this.postsService.posts({
      skip: before || after ? 1 : undefined,
      take: first || last,
      cursor:
        before || after
          ? {
              id: before || after,
            }
          : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      edges: posts.map((post) => ({
        cursor: post.id,
        node: post,
      })),
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
        startCursor: posts[0]?.id,
        endCursor: posts.slice(-1)[0]?.id,
      },
    };
  }
}
