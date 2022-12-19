import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCover1654770588996 implements MigrationInterface {
  name = 'AddCover1654770588996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "cover" character varying DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cover"`);
  }
}
