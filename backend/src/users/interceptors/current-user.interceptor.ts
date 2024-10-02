import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { accessToken } = request.session || {};

    if (accessToken) {
      try {
        const decodedToken = await this.jwtService.verifyAsync(accessToken);
        const userId = decodedToken.sub;
        const user = await this.userService.findOne(userId);
        request.currentUser = user;
      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          throw new BadRequestException('Invalid token');
        } else {
          throw error;
        }
      }
    }
    return handler.handle();
  }
}
