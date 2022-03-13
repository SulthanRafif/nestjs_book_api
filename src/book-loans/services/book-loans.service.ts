import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class BookLoansService {
  constructor(private connection: Connection) {}

  async loan() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
