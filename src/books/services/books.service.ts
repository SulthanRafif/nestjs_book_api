import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { FindConditions, Repository } from 'typeorm';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BookEntity } from '../entities/book.entity';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    // @InjectRepository(BookEntity)
    // private bookRepository: Repository<BookEntity>,
    
  ) {}

  async getBooks(
    user: UserEntity,
    filterBookDto: FilterBookDto,
  ): Promise<BookEntity[]> {

    console.log('user di service', user);
    return await this.bookRepository.getBooks(user, filterBookDto);

    // let filter: FindConditions<BookEntity> = {};
    // if (filterBookDto.title) {
    //   filter = { title: filterBookDto.title };
    // }
    // const books = await this.bookRepository.find(filter);

    // return books;
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new BadRequestException('book not found');
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'This is a custom message',
      //   },
      //   HttpStatus.FORBIDDEN,
      // );
    }

    return book;
  }

  async storeBook(user: UserEntity, bookData: BookDto): Promise<void> {
    console.log(bookData);
    // throw new Error('wait');
    // this.bookRepository.create(bookData);
    // const book = this.bookRepository.save(user, bookData);
    // return book;
    return await this.bookRepository.storeBook(user, bookData);
  }

  async updateBook(id: number, bookData: BookDto): Promise<BookDto> {
    await this.bookRepository.update(id, bookData);
    return bookData;
  }

  async destroyBook(id: number): Promise<any> {
    const book = await this.bookRepository.delete(id);
    return book;
  }
}
