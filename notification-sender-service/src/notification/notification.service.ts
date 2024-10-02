import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(
    email: string,
    subject: string,
    content: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `Chattini <${process.env.SMTP_FROM}>`,
        to: email,
        subject: subject,
        html: content,
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}
