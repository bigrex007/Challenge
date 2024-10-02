import { IsString } from 'class-validator';

export class SendPasswordResetDto {
  @IsString()
  email: string;
}
