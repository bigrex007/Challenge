import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  content: string;
}
