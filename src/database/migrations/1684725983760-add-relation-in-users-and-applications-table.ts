import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationInUsersAndApplicationsTable1684725983760 implements MigrationInterface {
    name = 'AddRelationInUsersAndApplicationsTable1684725983760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_applications" ("user_id" uuid NOT NULL, "application_id" uuid NOT NULL, CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("user_id", "application_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40a1af72742acf03560edf55cc" ON "users_applications" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_37d4056a2c1fdb6016048f8527" ON "users_applications" ("application_id") `);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "FK_40a1af72742acf03560edf55cce" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "FK_37d4056a2c1fdb6016048f85278" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "FK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "FK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37d4056a2c1fdb6016048f8527"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40a1af72742acf03560edf55cc"`);
        await queryRunner.query(`DROP TABLE "users_applications"`);
    }

}
