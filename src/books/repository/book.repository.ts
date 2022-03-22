import { EntityRepository, Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookDto } from '../dtos/create.book.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(
    user: UserEntity,
    filter: FilterBookDto,
  ): Promise<BookEntity[]> {
    const { title } = filter;

    const query = this.createQueryBuilder('books').where(
      'books.userId = :userId',
      { userId: user.id },
    );

    if (title) {
      query.andWhere('lower(books.title) LIKE :title', {
        title: `%${title.toLowerCase()}`,
      });
    }

    return await query.getMany();
  }

  async storeBook(user: UserEntity, bookData: BookDto): Promise<void> {
    const { title, description, author, publisher } = bookData;

    const book = this.create();
    book.title = title;
    book.author = author;
    book.description = description;
    book.publisher = publisher;
    book.user = user;

    try {
      await book.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
