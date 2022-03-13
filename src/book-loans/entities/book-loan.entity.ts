import { BookEntity } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book_loans' })
export class BookLoanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BookEntity)
  @JoinColumn()
  book: BookEntity;

  @Column()
  amount_borrowed: number;

  @Column()
  borrower_name: string;
}
