import {MigrationInterface, QueryRunner} from "typeorm";

export class addResumeName1620373473066 implements MigrationInterface {
    name = 'addResumeName1620373473066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "resume_name" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "resume_name"`);
    }

}
