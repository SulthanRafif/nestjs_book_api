import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  public async getBooks(
    @Query() filterBookDto: FilterBookDto,
  ): Promise<BookEntity[]> {
    return this.bookService.getBooks(filterBookDto);
  }

  @Get(':id')
  getOneBook(@Param() params): Promise<BookEntity> {
    return this.bookService.findOne(params.id);
  }

  @Post()
  async createBook(@Body() bodyData: BookDto): Promise<BookEntity> {
    return this.bookService.storeBook(bodyData);
  }

  @Put(':id')
  public async updateMovies(
    @Param() params,
    @Body() data: BookDto,
  ): Promise<BookDto> {
    return this.bookService.updateBook(params.id, data);
  }

  @Delete(':id')
  public async destroyBook(@Param() params): Promise<void> {
    return this.bookService.destroyBook(params.id);
  }
}
