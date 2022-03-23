import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BookLoansModule } from './book-loans/book-loans.module';
import configuration from './common/config/configuration';
import databaseConfig from './common/config/database.config';
import {
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
  RouterModule,
} from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
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

        return options;
      },
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: '/v1',
        children: [
          { path: '/', module: BooksModule },
          { path: '/', module: BookLoansModule },
          { path: '/', module: AuthModule },
        ],
      },
    ]),
    BookLoansModule,
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
