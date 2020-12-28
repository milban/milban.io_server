import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(args: Prisma.FindFirstPostArgs): Promise<Post[] | null> {
    return this.prisma.post.findMany(args);
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post | null> {
    return this.prisma.post.create({
      data,
    });
  }
}
