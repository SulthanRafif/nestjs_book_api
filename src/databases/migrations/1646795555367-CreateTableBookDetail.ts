import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableBookDetail1646795555367 implements MigrationInterface {
    name = 'CreateTableBookDetail1646795555367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`booksId\` int NULL, UNIQUE INDEX \`REL_96de0f366651ae10b8f979deba\` (\`booksId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`bookDetailsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD UNIQUE INDEX \`IDX_55b299b280d8d891e7a5ab1d4f\` (\`bookDetailsId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_55b299b280d8d891e7a5ab1d4f\` ON \`books\` (\`bookDetailsId\`)`);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD CONSTRAINT \`FK_96de0f366651ae10b8f979debae\` FOREIGN KEY (\`booksId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_55b299b280d8d891e7a5ab1d4f3\` FOREIGN KEY (\`bookDetailsId\`) REFERENCES \`book_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_55b299b280d8d891e7a5ab1d4f3\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP FOREIGN KEY \`FK_96de0f366651ae10b8f979debae\``);
        await queryRunner.query(`DROP INDEX \`REL_55b299b280d8d891e7a5ab1d4f\` ON \`books\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP INDEX \`IDX_55b299b280d8d891e7a5ab1d4f\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`bookDetailsId\``);
        await queryRunner.query(`DROP INDEX \`REL_96de0f366651ae10b8f979deba\` ON \`book_details\``);
        await queryRunner.query(`DROP TABLE \`book_details\``);
    }

}
