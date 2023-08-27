import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { emailDto } from './dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
}
