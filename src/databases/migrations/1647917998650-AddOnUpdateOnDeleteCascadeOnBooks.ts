import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOnUpdateOnDeleteCascadeOnBooks1647917998650 implements MigrationInterface {
    name = 'AddOnUpdateOnDeleteCascadeOnBooks1647917998650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_bb8627d137a861e2d5dc8d1eb20\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_bb8627d137a861e2d5dc8d1eb20\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_bb8627d137a861e2d5dc8d1eb20\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_bb8627d137a861e2d5dc8d1eb20\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
