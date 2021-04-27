import {MigrationInterface, QueryRunner} from "typeorm";

export class addResumeStyle1619414119835 implements MigrationInterface {
    name = 'addResumeStyle1619414119835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "styles" jsonb NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "styles"`);
    }

}
