import { Expose, Type } from 'class-transformer';

class UserDto {
  @Expose()
  userId: string;

  @Expose()
  username: string;
}

export class GetMessagesDto {
  @Expose()
  messageId: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  readAt: Date | null;

  @Expose()
  isRead: boolean;

  @Expose()
  @Type(() => UserDto)
  sender: UserDto;

  @Expose()
  @Type(() => UserDto)
  receiver: UserDto;
}
