import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteColumnbookDetailsIdAtBook1647137923125 implements MigrationInterface {
    name = 'DeleteColumnbookDetailsIdAtBook1647137923125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_55b299b280d8d891e7a5ab1d4f3\``);
        await queryRunner.query(`DROP INDEX \`REL_55b299b280d8d891e7a5ab1d4f\` ON \`books\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`bookDetailsId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`bookDetailsId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_55b299b280d8d891e7a5ab1d4f\` ON \`books\` (\`bookDetailsId\`)`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_55b299b280d8d891e7a5ab1d4f3\` FOREIGN KEY (\`bookDetailsId\`) REFERENCES \`book_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
