import {MigrationInterface, QueryRunner} from "typeorm";

export class alterResumeJsonbTypes1614500122968 implements MigrationInterface {
    name = 'alterResumeJsonbTypes1614500122968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "professional_experience"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "leadership_experience"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "others"`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "education" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "professional_experience" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "leadership_experience" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "others" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "others"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "leadership_experience"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "professional_experience"`);
        await queryRunner.query(`ALTER TABLE "resume" DROP COLUMN "education"`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "others" jsonb array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "leadership_experience" jsonb array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "professional_experience" jsonb array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "resume" ADD "education" jsonb array NOT NULL DEFAULT '{}'`);
    }

}
