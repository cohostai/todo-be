import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method } = req;

    return next.handle().pipe(
      tap(() =>
        console.log({
          originalUrl,
          method,
          statusCode,
        }),
      ),
    );
  }
}
