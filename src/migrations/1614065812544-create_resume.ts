import {MigrationInterface, QueryRunner} from "typeorm";

export class createResume1614065812544 implements MigrationInterface {
    name = 'createResume1614065812544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resume" ("id" SERIAL NOT NULL, "name" text, "english_name" text, "phone" text, "email" text, "address" text, "education" jsonb array NOT NULL DEFAULT '{}'::jsonb[], "professional_experience" jsonb array NOT NULL DEFAULT '{}'::jsonb[], "leadership_experience" jsonb array NOT NULL DEFAULT '{}'::jsonb[], "others" jsonb array NOT NULL DEFAULT '{}'::jsonb[], "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resume"`);
    }

}
