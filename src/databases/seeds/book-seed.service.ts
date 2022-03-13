import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(BookDetailEntity)
    private bookDetailRepository: Repository<BookDetailEntity>,
  ) {}

  async seed(): Promise<void> {
    const book = this.bookRepository.create({
      title: 'Hujan',
      author: 'Tere Liye',
      publisher: 'Gramedia',
      description: 'Description',
    });

    await this.bookRepository.save(book);
    const detailBook = this.bookDetailRepository.create({
      quantity: 10,
      price: 3000,
      book: [book],
    });

    await this.bookDetailRepository.save(detailBook);
  }
}
