import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserIdOnBookLoansAndBooks1647840605042 implements MigrationInterface {
    name = 'AddUserIdOnBookLoansAndBooks1647840605042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD \`userId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`userId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_ed1f76ab204d45746973b165087\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_bb8627d137a861e2d5dc8d1eb20\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_bb8627d137a861e2d5dc8d1eb20\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_ed1f76ab204d45746973b165087\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP COLUMN \`userId\``);
    }

}
