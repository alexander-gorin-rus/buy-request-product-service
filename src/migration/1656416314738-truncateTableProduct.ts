import { MigrationInterface, QueryRunner } from 'typeorm';

export class truncateTableProduct1656416314738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "product"`);
  }
  down(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
