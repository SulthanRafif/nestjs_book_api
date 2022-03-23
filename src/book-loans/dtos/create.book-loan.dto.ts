import { IsNotEmpty } from 'class-validator';

export class BookLoanDto {
  @IsNotEmpty()
  amount_borrowed: number;

  @IsNotEmpty()
  bookId: number;
}
