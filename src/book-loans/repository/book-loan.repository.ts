import { InternalServerErrorException } from '@nestjs/common';
import { BookEntity } from 'src/books/entities/book.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BookLoanDto } from '../dtos/create.book-loan.dto';
import { BookLoanEntity } from '../entities/book-loan.entity';

@EntityRepository(BookLoanEntity)
export class BookLoanRepository extends Repository<BookLoanEntity> {
  async storeBookLoan(
    user: UserEntity,
    bookLoanData: BookLoanDto,
    book: BookEntity,
  ): Promise<void> {
    const { amount_borrowed } = bookLoanData;

    const bookLoan = this.create();
    bookLoan.amount_borrowed = amount_borrowed;
    bookLoan.borrower_name = user.username;
    bookLoan.user = user;
    bookLoan.book = book;

    try {
      await bookLoan.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
