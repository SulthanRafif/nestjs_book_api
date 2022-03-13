import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableBookLoan1646806154179 implements MigrationInterface {
    name = 'CreateTableBookLoan1646806154179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book_loans\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount_borrowed\` int NOT NULL, \`borrower_name\` varchar(255) NOT NULL, \`bookId\` int NULL, UNIQUE INDEX \`REL_479d9ce8d87ebbcb19645756aa\` (\`bookId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_479d9ce8d87ebbcb19645756aac\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_479d9ce8d87ebbcb19645756aac\``);
        await queryRunner.query(`DROP INDEX \`REL_479d9ce8d87ebbcb19645756aa\` ON \`book_loans\``);
        await queryRunner.query(`DROP TABLE \`book_loans\``);
    }

}
