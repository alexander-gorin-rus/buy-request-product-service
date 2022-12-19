import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTags1649156145345 implements MigrationInterface {
  name = 'UpdateTags1649156145345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "rating" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "tag" TO "tags";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "rating" SET DEFAULT '5'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "tags" TO "tag";`,
    );
  }
}
