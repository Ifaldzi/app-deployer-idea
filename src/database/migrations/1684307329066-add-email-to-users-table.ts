import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToUsersTable1684307329066 implements MigrationInterface {
    name = 'AddEmailToUsersTable1684307329066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
