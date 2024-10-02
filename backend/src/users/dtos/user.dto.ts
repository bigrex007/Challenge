import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsString()
  @Expose()
  userId: string;

  @IsString()
  @Expose()
  username: string;

  @Expose()
  @IsEmail()
  email: string;

  @IsString()
  @Expose()
  role: string;
}
