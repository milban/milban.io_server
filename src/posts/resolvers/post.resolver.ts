import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { CreatePostInput, User } from '../../graphql.schema';
import { Post } from '@prisma/client';
import { UsersService } from '../../users/users.service';

@Resolver('Post')
export class PostResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Mutation('createPost')
  @UseGuards(GqlAuthGuard)
  async createPost(
    @CurrentUser() user: User,
    @Args('input') input: CreatePostInput,
  ) {
    try {
      const { title } = input;
      return this.postsService.createPost({
        title,
        isPublish: false,
        User: {
          connect: {
            id: user.id,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  @ResolveField('author')
  async author(@Parent() post: Post) {
    const { authorId } = post;
    return this.usersService.user({
      id: authorId,
    });
  }
}
