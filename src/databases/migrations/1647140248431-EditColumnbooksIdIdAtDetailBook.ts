import {MigrationInterface, QueryRunner} from "typeorm";

export class EditColumnbooksIdIdAtDetailBook1647140248431 implements MigrationInterface {
    name = 'EditColumnbooksIdIdAtDetailBook1647140248431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP FOREIGN KEY \`FK_96de0f366651ae10b8f979debae\``);
        await queryRunner.query(`DROP INDEX \`IDX_96de0f366651ae10b8f979deba\` ON \`book_details\``);
        await queryRunner.query(`DROP INDEX \`REL_96de0f366651ae10b8f979deba\` ON \`book_details\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP COLUMN \`booksId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD \`booksId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_96de0f366651ae10b8f979deba\` ON \`book_details\` (\`booksId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_96de0f366651ae10b8f979deba\` ON \`book_details\` (\`booksId\`)`);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD CONSTRAINT \`FK_96de0f366651ae10b8f979debae\` FOREIGN KEY (\`booksId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
