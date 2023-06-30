import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationInUsersApplicationsTable1688120428672 implements MigrationInterface {
    name = 'AddRelationInUsersApplicationsTable1688120428672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_applications" ("user_id" uuid NOT NULL, "application_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("user_id", "application_id"))`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "FK_37d4056a2c1fdb6016048f85278" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "FK_40a1af72742acf03560edf55cce" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "FK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "FK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`DROP TABLE "users_applications"`);
    }

}
