import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeFieldStructureMedia1655915330669
  implements MigrationInterface
{
  name = 'ChangeFieldStructureMedia1655915330669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "media"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "media" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "cover" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "cover" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "media"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "media" character varying array DEFAULT '{}'`,
    );
  }
}
