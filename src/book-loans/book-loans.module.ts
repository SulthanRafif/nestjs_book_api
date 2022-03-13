import { Module } from '@nestjs/common';
import { BookLoansService } from './services/book-loans.service';

@Module({
  providers: [BookLoansService],
})
export class BookLoansModule {}

