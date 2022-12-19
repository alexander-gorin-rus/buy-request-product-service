import { MigrationInterface, QueryRunner } from 'typeorm';

export class setTitleEnAndTitleRu1659339158768 implements MigrationInterface {
  name = 'setTitleEnAndTitleRu1659339158768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "titleRu" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "titleEn" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "titleEn"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "titleRu"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "title" character varying NOT NULL`,
    );
  }
}
