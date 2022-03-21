import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  // ValidationPipe,
  // UseFilters,
} from '@nestjs/common';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BooksService } from '../services/books.service';
import { ValidationPipe } from 'src/common/pipes/validation.pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/config/role.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
// import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@UseGuards(RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) { }

  @Get()
  public async getBooks(
    @Query() filterBookDto: FilterBookDto,
    @GetUser() user: UserEntity,
  ): Promise<BookEntity[]> {
    console.log('ambil user', user);
    return this.bookService.getBooks(user, filterBookDto);
  }

  @Roles(RoleEnum.User)
  @Get(':id')
  // @UseFilters(HttpExceptionFilter)
  getOneBook(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @Roles(RoleEnum.Admin)
  @Post()
  async createBook(
    @Body(new ValidationPipe()) bodyData: BookDto,
    // @Body() bodyData: BookDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.bookService.storeBook(user, bodyData);
  }

  @Put(':id')
  public async updateBooks(
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
