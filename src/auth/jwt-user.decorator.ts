import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const _ctx = GqlExecutionContext.create(ctx);
    return _ctx.getContext().req.user;
  },
);
