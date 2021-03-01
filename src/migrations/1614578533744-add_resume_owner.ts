import {MigrationInterface, QueryRunner} from "typeorm";

export class addResumeOwner1614578533744 implements MigrationInterface {
    name = 'addResumeOwner1614578533744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ADD "owner" text NOT NULL DEFAULT 'foo'`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "owner" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "owner"`);
    }

}
