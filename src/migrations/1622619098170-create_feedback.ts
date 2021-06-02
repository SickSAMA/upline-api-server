import {MigrationInterface, QueryRunner} from "typeorm";

export class createFeedback1622619098170 implements MigrationInterface {
    name = 'createFeedback1622619098170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "name" text NOT NULL DEFAULT '', "email" text NOT NULL DEFAULT '', "message" text NOT NULL DEFAULT '', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "owner" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resume" ALTER COLUMN "owner" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "feedback"`);
    }

}
