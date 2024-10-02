import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagesService } from './messaging.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetMessagesDto } from './dtos/get-messages.dto';
import { ConversationDto } from './dtos/conversation.dto';

@Controller('users/:userId')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Serialize(GetMessagesDto)
  @Get('/messages/:otherUserId')
  async getMessages(
    @Param('userId') userId: string,
    @Param('otherUserId') otherUserId: string,
    @CurrentUser() user: User,
  ) {
    if (user?.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to access these messages',
      );
    }

    return await this.messagesService.getMessagesBetweenUsers(
      userId,
      otherUserId,
    );
  }

  @Serialize(GetMessagesDto)
  @Post('/messages/:otherUserId')
  async createMessage(
    @Param('userId') userId: string,
    @Param('otherUserId') otherUserId: string,
    @Body('content') content: string,
    @CurrentUser() user: User,
  ) {
    if (user?.userId !== userId && user?.userId !== otherUserId) {
      throw new UnauthorizedException(
        'You are not authorized to send messages from this user',
      );
    }

    const newMessage = await this.messagesService.createMessage(
      userId,
      otherUserId,
      content,
    );

    return newMessage;
  }

  @Patch('/messages/:otherUserId/mark-as-read')
  async markAsRead(
    @Param('userId') userId: string,
    @Param('otherUserId') otherUserId: string,
    @CurrentUser() user: User,
  ) {
    if (user.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to mark this message as read',
      );
    }

    return await this.messagesService.markConversationAsRead(
      userId,
      otherUserId,
    );
  }

  @Serialize(ConversationDto)
  @Get('/conversations')
  async getUserConversations(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ) {
    if (user?.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to access these messages',
      );
    }

    return await this.messagesService.getUserConversations(userId);
  }
}
