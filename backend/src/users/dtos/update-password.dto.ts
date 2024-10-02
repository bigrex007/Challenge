import { IsString, IsUUID } from 'class-validator';

export class UpdatePasswordDto {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;

  @IsString()
  password: string;
}
