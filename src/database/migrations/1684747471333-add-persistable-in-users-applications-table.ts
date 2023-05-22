import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPersistableInUsersApplicationsTable1684747471333 implements MigrationInterface {
    name = 'AddPersistableInUsersApplicationsTable1684747471333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "FK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "FK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40a1af72742acf03560edf55cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37d4056a2c1fdb6016048f8527"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_37d4056a2c1fdb6016048f85278" PRIMARY KEY ("application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("application_id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_40a1af72742acf03560edf55cce" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "application_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "application_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("user_id", "application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_37d4056a2c1fdb6016048f85278" PRIMARY KEY ("application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("application_id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_40a1af72742acf03560edf55cce" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "application_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "application_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("user_id", "application_id")`);
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
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_40a1af72742acf03560edf55cce" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "application_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "application_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("application_id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_37d4056a2c1fdb6016048f85278" PRIMARY KEY ("application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("user_id", "application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_40a1af72742acf03560edf55cce" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "application_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "application_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_40a1af72742acf03560edf55cce"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("application_id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_552c61171b08f6dac0309e251c3"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_37d4056a2c1fdb6016048f85278" PRIMARY KEY ("application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP CONSTRAINT "PK_37d4056a2c1fdb6016048f85278"`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "PK_552c61171b08f6dac0309e251c3" PRIMARY KEY ("user_id", "application_id")`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users_applications" DROP COLUMN "created_at"`);
        await queryRunner.query(`CREATE INDEX "IDX_37d4056a2c1fdb6016048f8527" ON "users_applications" ("application_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_40a1af72742acf03560edf55cc" ON "users_applications" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "FK_37d4056a2c1fdb6016048f85278" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_applications" ADD CONSTRAINT "FK_40a1af72742acf03560edf55cce" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
