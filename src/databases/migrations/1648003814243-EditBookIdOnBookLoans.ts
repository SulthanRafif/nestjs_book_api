import {MigrationInterface, QueryRunner} from "typeorm";

export class EditBookIdOnBookLoans1648003814243 implements MigrationInterface {
    name = 'EditBookIdOnBookLoans1648003814243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`REL_479d9ce8d87ebbcb19645756aa\` ON \`book_loans\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_479d9ce8d87ebbcb19645756aac\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_479d9ce8d87ebbcb19645756aac\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_479d9ce8d87ebbcb19645756aa\` ON \`book_loans\` (\`bookId\`)`);
    }

}
