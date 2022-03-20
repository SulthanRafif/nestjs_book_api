import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BookLoansModule } from './book-loans/book-loans.module';
import configuration from './common/config/configuration';
import databaseConfig from './common/config/database.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { logger } from './common/middlewares/logger-function.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE, RouterModule } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SnakeCaseInterceptor } from './common/interceptors/snake-case.interceptor';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('database');
        console.log(options);

        return options;
      },
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: '/v1',
        children: [
          { path: "/", module: BooksModule},
          { path: "/", module: AuthModule }
        ]
      }
    ]),
    BookLoansModule,
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SnakeCaseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(LoggerMiddleware).forRoutes('v1/books');
// }

// configure(consumer: MiddlewareConsumer) {
//   consumer.apply(logger).forRoutes('v1/books');
// }