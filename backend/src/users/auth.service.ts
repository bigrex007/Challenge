import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import callAPI from 'src/api/callAPI';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async decodeJwtToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async getUserFromSession(token: string) {
    try {
      const decodedToken = await this.decodeJwtToken(token);
      const userId = decodedToken.sub;
      const user = await this.usersService.findOne(userId);
      return user;
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new BadRequestException('Invalid token');
      } else {
        throw error;
      }
    }
  }

  async signup(username: string, email: string, password: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Email is already in use');
    }

    const salt = randomBytes(32).toString('hex');

    const hash = (await scrypt(password, salt, 128)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const newUser = await this.usersService.create(username, email, result);

    const payload = { sub: newUser.userId, username: newUser.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { newUser, accessToken };
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email and password provided do not match');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 128)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      const payload = { sub: user.userId, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken, user };
    } else {
      throw new BadRequestException('Email and password provided do not match');
    }
  }

  async updatePassword(userId: string, token: string, password: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Invalid email or token');
    }

    if (!user.passwordResetToken || !user.passwordResetExpires) {
      throw new BadRequestException('Invalid or expired password reset token');
    }

    if (user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Password reset token has expired');
    }

    const passwordResetToken = token.split('.')[1];
    const storedHash = user.passwordResetToken.split('.')[1];

    if (passwordResetToken !== storedHash) {
      throw new BadRequestException('Invalid password reset token');
    }

    const newSalt = randomBytes(32).toString('hex');
    const newHashBuffer = (await scrypt(password, newSalt, 128)) as Buffer;
    const newPasswordHash = newSalt + '.' + newHashBuffer.toString('hex');

    await this.usersService.update(user.userId, {
      password: newPasswordHash,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    return 'Password has been successfully updated';
  }

  async requestPasswordReset(email: string) {
    const users = await this.usersService.findByEmail(email);

    if (users.length === 0) {
      return;
    }

    const user = users[0];

    const resetToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await this.usersService.update(user.userId, {
      passwordResetToken: resetToken,
      passwordResetExpires: tokenExpiry,
    });

    const resetLink = `http://localhost:5173/update-password/${user.userId}/${resetToken}`;

    const emailContent = `
      <p>Hello ${user.username},</p>
      <p>You have requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in 15 minutes.</p>
    `;

    try {
      await callAPI.post('notifications/send-email', {
        email: user.email,
        subject: 'Password Reset Request',
        content: emailContent,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Unable to send password reset email');
    }

    return 'Password reset email sent';
  }

  private async sendNotification(email: string, messageContent: string) {
    const subject = 'New Message Received';
    const content = `
      <p>You have received a new message:</p>
      <p>"${messageContent}"</p>
      <p>Log in to your account to reply.</p>
    `;

    await callAPI.post('http://localhost:3500/notifications/send-email', {
      email,
      subject,
      content,
    });
  }
}
