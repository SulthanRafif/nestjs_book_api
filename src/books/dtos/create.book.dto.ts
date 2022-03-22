import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BookDetailDto {
  @IsNotEmpty()
  price: number;
}
export class BookDto {
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  publisher: string;
}
