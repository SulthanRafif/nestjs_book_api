import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { BooksService } from './books/services/books.service';
import { SnakeCaseInterceptor } from './common/interceptors/snake-case.interceptor';
import { logger } from './common/middlewares/logger-function.middleware';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const bookService = app.get(BooksService);
  // console.log(bookService);
  // app.use(logger);

  // app.useGlobalPipes(new ValidationPipe());
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);

  const port = configService.get('port');
  console.log(port);

  if (app.getHttpAdapter() instanceof ExpressAdapter) {
    app.disable('x-powered-by');
    app.useGlobalInterceptors(new SnakeCaseInterceptor());
  }

  await app.listen(3000);
}
bootstrap();
