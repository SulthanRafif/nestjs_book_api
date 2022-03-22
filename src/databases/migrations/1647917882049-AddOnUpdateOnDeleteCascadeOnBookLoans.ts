import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOnUpdateOnDeleteCascadeOnBookLoans1647917882049 implements MigrationInterface {
    name = 'AddOnUpdateOnDeleteCascadeOnBookLoans1647917882049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_479d9ce8d87ebbcb19645756aac\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_ed1f76ab204d45746973b165087\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_ed1f76ab204d45746973b165087\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_479d9ce8d87ebbcb19645756aac\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_479d9ce8d87ebbcb19645756aac\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_ed1f76ab204d45746973b165087\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_ed1f76ab204d45746973b165087\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_479d9ce8d87ebbcb19645756aac\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
