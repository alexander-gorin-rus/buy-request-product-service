import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFieldTypeMedia1654858881684 implements MigrationInterface {
  name = 'ChangeFieldTypeMedia1654858881684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "media"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "media" character varying array DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "media"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "media" character varying`,
    );
  }
}
