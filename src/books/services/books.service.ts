import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BookEntity } from '../entities/book.entity';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(
    user: UserEntity,
    filterBookDto: FilterBookDto,
  ): Promise<BookEntity[]> {
    return await this.bookRepository.getBooks(user, filterBookDto);
  }

  async findOne(user: UserEntity, id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id, { where: { user } });

    if (!book) {
      throw new BadRequestException('book not found');
    }
    return book;
  }

  async storeBook(user: UserEntity, bookData: BookDto): Promise<void> {
    return await this.bookRepository.storeBook(user, bookData);
  }

  async updateBook(
    user: UserEntity,
    id: number,
    bookData: BookDto,
  ): Promise<void> {
    const { title, author, description, publisher } = bookData;
    const book = await this.findOne(user, id);
    book.title = title;
    book.author = author;
    book.description = description;
    book.publisher = publisher;

    await book.save();
  }

  async destroyBook(user: UserEntity, id: number): Promise<void> {
    const result = await this.bookRepository.delete({ user, id });

    if (result.affected == 0) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }
  }
}
