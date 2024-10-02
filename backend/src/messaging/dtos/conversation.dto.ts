import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ConversationDto {
  @IsString()
  @Expose()
  otherUserId: string;

  @IsString()
  @Expose()
  otherUsername: string;

  @IsString()
  @Expose()
  contentPreview: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsNumber()
  @Expose()
  unreadCount: number;
}
