import { RoleEnum } from 'src/common/config/role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import { BookLoanEntity } from 'src/book-loans/entities/book-loan.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'text', select: true })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[];

  @OneToMany(() => BookLoanEntity, (bookLoan) => bookLoan.user)
  bookLoans: BookLoanEntity;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true,
  })
  refreshToken: RefreshToken[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(6);
    if (this.password) {
      this.password = await bcrypt.hash(password || this.password, salt);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
