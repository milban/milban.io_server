import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from '../posts.service';
import { CreatePostInput, User } from '../../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { UsersService } from '../../users/users.service';
import { Post } from '@prisma/client';

@Resolver('Post')
export class CreatePostResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
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
