import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;
  constructor(configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('nodemailer_host'),
      port: configService.get('nodemailer_port'),
      secure: false,
      auth: {
        user: configService.get('nodemailer_auth_user'),
        pass: configService.get('nodemailer_auth_pass'),
      },
    });
  }

  async sendMail({ to, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: '2682265436@qq.com',
      },
      to,
      subject: '注册验证码',
      html,
    });
  }
}
