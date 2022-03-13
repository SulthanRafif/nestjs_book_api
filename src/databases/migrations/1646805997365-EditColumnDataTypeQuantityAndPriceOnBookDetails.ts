import {MigrationInterface, QueryRunner} from "typeorm";

export class EditColumnDataTypeQuantityAndPriceOnBookDetails1646805997365 implements MigrationInterface {
    name = 'EditColumnDataTypeQuantityAndPriceOnBookDetails1646805997365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_55b299b280d8d891e7a5ab1d4f\` ON \`books\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD \`price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD \`price\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book_details\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`book_details\` ADD \`quantity\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_55b299b280d8d891e7a5ab1d4f\` ON \`books\` (\`bookDetailsId\`)`);
    }

}
