import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookLoanEntity } from 'src/book-loans/entities/book-loan.entity';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import { RoleEnum } from 'src/common/config/role.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(BookDetailEntity)
    private bookDetailRepository: Repository<BookDetailEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BookLoanEntity)
    private bookLoanRepository: Repository<BookLoanEntity>
  ) {}

  async seed(): Promise<void> {
    await this.userRepository.delete({});
    const user = this.userRepository.create({
      username: 'user',
      password: 'user123',
      name: 'user123',
      role: RoleEnum.User,
    });
    const admin = this.userRepository.create({
      username: 'admin',
      password: 'admin123',
      name: 'admin123',
      role: RoleEnum.Admin,
    });
    await Promise.all([
      this.userRepository.save(user),
      this.userRepository.save(admin),
    ]);

    const book = this.bookRepository.create({
      title: 'Hujan',
      author: 'Tere Liye',
      publisher: 'Gramedia',
      description: 'Description',
      user: user,
    });
    await this.bookRepository.save(book);

    const detailBook = this.bookDetailRepository.create({
      quantity: 10,
      price: 3000,
      book: [book],
    });
    await this.bookDetailRepository.save(detailBook);

    const bookLoan = this.bookLoanRepository.create({
      book: book,
      amount_borrowed: 1,
      user: user,
      borrower_name: user.name,
    })
    await this.bookLoanRepository.save(bookLoan);
  }
}
