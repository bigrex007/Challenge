import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesService } from './messaging.service';
import { MessagesController } from './messaging.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { AuthService } from 'src/users/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [MessagesService, JwtService, CurrentUserInterceptor, AuthService],
  controllers: [MessagesController],
})
export class MessagingModule {}
