import { BookEntity } from 'src/books/entities/book.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book_loans' })
export class BookLoanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.bookLoans)
  user: UserEntity;

  @OneToOne(() => BookEntity)
  @JoinColumn()
  book: BookEntity;

  @Column()
  amount_borrowed: number;

  @Column()
  borrower_name: string;
}
