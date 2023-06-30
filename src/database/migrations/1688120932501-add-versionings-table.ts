import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVersioningsTable1688120932501 implements MigrationInterface {
    name = 'AddVersioningsTable1688120932501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "versionings" ("id" uuid NOT NULL, "version" character varying NOT NULL, "file_key" character varying NOT NULL, "description" text, "application_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_885e383b48f0e4190523d6d1df5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "versionings" ADD CONSTRAINT "FK_aff97234aec3d3be13e616d80f1" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "versionings" DROP CONSTRAINT "FK_aff97234aec3d3be13e616d80f1"`);
        await queryRunner.query(`DROP TABLE "versionings"`);
    }

}
