import { BookEntity } from 'src/books/entities/book.entity';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import databaseConfig from 'src/common/config/database.config';
import { BookLoanEntity } from 'src/book-loans/entities/book-loan.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';

module.exports = {
  host: databaseConfig().host,
  type: 'mysql',
  port: databaseConfig().port,
  username: databaseConfig().username,
  password: databaseConfig().password,
  database: databaseConfig().database,
  syncronize: false,
  entities: [
    BookEntity,
    BookDetailEntity,
    BookLoanEntity,
    UserEntity,
    RefreshToken,
  ],
  migrations: ['src/databases/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/databases/migrations',
  },
};
