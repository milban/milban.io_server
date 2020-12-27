import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    /*
      forRoot option
      https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructor-options-lt-ApolloServer-gt
     */
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.graphql'],
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },
    }),
    AuthModule,
    UsersModule,
    CommonModule,
    PostsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
