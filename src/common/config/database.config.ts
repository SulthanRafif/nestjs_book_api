import { registerAs } from '@nestjs/config';
import { BookEntity } from 'src/books/entities/book.entity';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookLoanEntity } from 'src/book-loans/entities/book-loan.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncronize: false,
  entities: [
    BookEntity,
    BookDetailEntity,
    BookLoanEntity,
    UserEntity,
    RefreshToken,
  ],
}));
