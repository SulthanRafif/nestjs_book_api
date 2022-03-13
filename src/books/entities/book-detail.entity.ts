import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity({ name: 'book_details' })
export class BookDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToMany(() => BookEntity)
  @JoinTable({
    name: 'book_has_detail',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'book_detail_id',
      referencedColumnName: 'id',
    },
  })

  book: BookEntity[];
}
