import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import databaseConfig from 'src/common/config/database.config';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookSeedService } from './book-seed.service';
import { UserSeeder } from './providers/user.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
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
    TypeOrmModule.forFeature([BookEntity, BookDetailEntity, UserEntity]),
  ],

  providers: [BookSeedService, UserSeeder],
})
export class SeedModule {}
