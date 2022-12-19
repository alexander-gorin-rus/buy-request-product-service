import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductUpdateFields1647353818455 implements MigrationInterface {
  name = 'ProductUpdateFields1647353818455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "production_guarantee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "productionGuarantee" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "media" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "PK_8e4052373c579afc1471f526760"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "media"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "productionGuarantee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "production_guarantee" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" integer NOT NULL`,
    );
  }
}
