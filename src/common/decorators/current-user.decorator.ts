import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/module/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
