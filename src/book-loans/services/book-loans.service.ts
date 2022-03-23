import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/entities/book.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';
import { BookLoanDto } from '../dtos/create.book-loan.dto';
import { BookLoanRepository } from '../repository/book-loan.repository';

@Injectable()
export class BookLoansService {
  constructor(
    @InjectRepository(BookLoanRepository)
    private readonly bookLoanRepository: BookLoanRepository,
    private connection: Connection,
  ) {}

  // async loan() {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async storeBookLoan(
    user: UserEntity,
    bookLoanData: BookLoanDto,
    book: BookEntity,
  ): Promise<void> {
    return await this.bookLoanRepository.storeBookLoan(
      user,
      bookLoanData,
      book,
    );
  }
}
