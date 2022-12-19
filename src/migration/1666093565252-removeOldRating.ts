import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeOldRating1666093565252 implements MigrationInterface {
  name = 'removeOldRating1666093565252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "rating" numeric(2,1) NOT NULL DEFAULT '5'`,
    );
  }
}
