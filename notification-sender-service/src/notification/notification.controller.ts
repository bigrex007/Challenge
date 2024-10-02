import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-email')
  async sendEmail(
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    await this.notificationService.sendEmail(email, subject, content);
  }
}
