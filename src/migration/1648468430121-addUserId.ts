import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserId1648468430121 implements MigrationInterface {
  name = 'addUserId1648468430121';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "userId" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "userId" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
  }
}
