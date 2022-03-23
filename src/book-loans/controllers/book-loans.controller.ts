import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BooksService } from 'src/books/services/books.service';
import { RoleEnum } from 'src/common/config/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidationPipe } from 'src/common/pipes/validation.pipes';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookLoanDto } from '../dtos/create.book-loan.dto';
import { BookLoansService } from '../services/book-loans.service';

@UseGuards(RolesGuard)
@Controller('book-loans')
export class BookLoansController {
  constructor(
    private bookLoanService: BookLoansService,
    private bookService: BooksService,
  ) {}

  @Roles(RoleEnum.Admin)
  @Post()
  async createBookLoan(
    @Body(new ValidationPipe()) bodyData: BookLoanDto,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    const book = await this.bookService.findOne(user, bodyData.bookId);
    return this.bookLoanService.storeBookLoan(user, bodyData, book);
  }
}
