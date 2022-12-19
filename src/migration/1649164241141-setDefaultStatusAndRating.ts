import { MigrationInterface, QueryRunner } from 'typeorm';

export class setDefaultStatusAndRating1649164241141
  implements MigrationInterface
{
  name = 'setDefaultStatusAndRating1649164241141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" SET DEFAULT 'ON_MODERATION'`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "rating" SET DEFAULT '5'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "rating" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "status" DROP DEFAULT`,
    );
  }
}
