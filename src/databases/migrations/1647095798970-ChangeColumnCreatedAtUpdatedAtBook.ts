import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnCreatedAtUpdatedAtBook1647095798970
  implements MigrationInterface
{
  name = 'ChangeColumnCreatedAtUpdatedAtBook1647095798970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`created_at\``);
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
  }
}
