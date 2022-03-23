import { BookEntity } from 'src/books/entities/book.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'book_loans' })
export class BookLoanEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.bookLoans, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.bookLoans, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  book: BookEntity;

  @Column()
  amount_borrowed: number;

  @Column()
  borrower_name: string;
}
