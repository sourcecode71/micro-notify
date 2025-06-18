import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from '../config/config.service';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  async sendEmail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"Notify" <${config.smtp.user}>`,
      to,
      subject,
      html,
    });
  }
}
