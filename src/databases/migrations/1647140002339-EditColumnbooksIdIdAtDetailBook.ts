import {MigrationInterface, QueryRunner} from "typeorm";

export class EditColumnbooksIdIdAtDetailBook1647140002339 implements MigrationInterface {
    name = 'EditColumnbooksIdIdAtDetailBook1647140002339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP FOREIGN KEY \`FK_96de0f366651ae10b8f979debae\``);
        await queryRunner.query(`DROP INDEX \`REL_96de0f366651ae10b8f979deba\` ON \`book_details\``);
        await queryRunner.query(`CREATE TABLE \`book_has_detail\` (\`book_id\` int NOT NULL, \`book_detail_id\` int NOT NULL, INDEX \`IDX_261aa691343f504472246f8447\` (\`book_id\`), INDEX \`IDX_6cf980fc286b77d08aeba169a8\` (\`book_detail_id\`), PRIMARY KEY (\`book_id\`, \`book_detail_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP COLUMN \`booksId\``);
        await queryRunner.query(`ALTER TABLE \`book_has_detail\` ADD CONSTRAINT \`FK_261aa691343f504472246f84470\` FOREIGN KEY (\`book_id\`) REFERENCES \`book_details\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_has_detail\` ADD CONSTRAINT \`FK_6cf980fc286b77d08aeba169a80\` FOREIGN KEY (\`book_detail_id\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_has_detail\` DROP FOREIGN KEY \`FK_6cf980fc286b77d08aeba169a80\``);
        await queryRunner.query(`ALTER TABLE \`book_has_detail\` DROP FOREIGN KEY \`FK_261aa691343f504472246f84470\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD \`booksId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_6cf980fc286b77d08aeba169a8\` ON \`book_has_detail\``);
        await queryRunner.query(`DROP INDEX \`IDX_261aa691343f504472246f8447\` ON \`book_has_detail\``);
        await queryRunner.query(`DROP TABLE \`book_has_detail\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_96de0f366651ae10b8f979deba\` ON \`book_details\` (\`booksId\`)`);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD CONSTRAINT \`FK_96de0f366651ae10b8f979debae\` FOREIGN KEY (\`booksId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
