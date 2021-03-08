import {MigrationInterface, QueryRunner} from "typeorm";

export class addResumeUuid1615190255068 implements MigrationInterface {
    name = 'addResumeUuid1615190255068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "uuid"`);
    }

}
