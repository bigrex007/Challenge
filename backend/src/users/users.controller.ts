import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { SendPasswordResetDto } from './dtos/send-password-reset.dto';
import { UserDto } from './dtos/user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const { newUser, accessToken } = await this.authService.signup(
      body.username,
      body.email,
      body.password,
    );
    session.accessToken = accessToken;
    return newUser;
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto, @Session() session: any) {
    const { accessToken, user } = await this.authService.signin(
      body.email,
      body.password,
    );
    session.accessToken = accessToken;
    return user;
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: SendPasswordResetDto) {
    const { email } = body;
    await this.authService.requestPasswordReset(email);
    return 'If your email exists in our system, you will receive a password reset link shortly.';
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.accessToken = null;
  }

  @UseGuards(AuthGuard)
  @Get('/whoami')
  WhoAmI(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/:userId')
  async findUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    return user;
  }

  @Patch('/update-password')
  async updatePassword(@Body() body: UpdatePasswordDto) {
    const { userId, token, password } = body;
    return await this.authService.updatePassword(userId, token, password);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async find() {
    const users = await this.userService.find();
    return users;
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete('/:userId')
  async remove(@Param('userId') userId: string) {
    await this.userService.remove(userId);
  }
}
