import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from 'custom-exception.filter';
import { FormatResponseInterceptor } from 'format-response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  await app.listen(3001);
}
bootstrap();
