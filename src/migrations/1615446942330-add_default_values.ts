import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultValues1615446942330 implements MigrationInterface {
    name = 'addDefaultValues1615446942330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE resume SET name = '' WHERE name IS NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "name" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`UPDATE resume SET english_name = '' WHERE english_name IS NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "english_name" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "english_name" SET NOT NULL`);
        await queryRunner.query(`UPDATE resume SET phone = '' WHERE phone IS NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`UPDATE resume SET email = '' WHERE email IS NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`UPDATE resume SET address = '' WHERE address IS NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "address" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "email" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "phone" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "english_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "english_name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "name" DROP DEFAULT`);
    }

}
