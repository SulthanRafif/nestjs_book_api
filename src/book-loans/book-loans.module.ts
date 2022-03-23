import { Module } from '@nestjs/common';
import { BookLoansService } from './services/book-loans.service';
import { BookLoansController } from './controllers/book-loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookLoanRepository } from './repository/book-loan.repository';
import { BooksService } from 'src/books/services/books.service';
import { BookRepository } from 'src/books/repository/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookLoanRepository, BookRepository])],
  providers: [BookLoansService, BooksService],
  controllers: [BookLoansController],
})
export class BookLoansModule {}

