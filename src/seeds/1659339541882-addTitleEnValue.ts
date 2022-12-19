import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTitleEnValue1659339541882 implements MigrationInterface {
  private defaultTags: { name: string; titleRu: string }[] = [
    {
      name: 'Children products',
      titleRu: 'Детские товары',
    },
    {
      name: 'Clothing and footwear',
      titleRu: 'Одежда и обувь',
    },
    {
      name: 'Books',
      titleRu: 'Книги',
    },
    {
      name: 'Sport',
      titleRu: 'Спорт',
    },
    {
      name: 'Auto',
      titleRu: 'Авто',
    },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const tag of this.defaultTags) {
      await queryRunner.query(`INSERT INTO "tag" ("name" , "titleRu")
    VALUES ('${tag.name}' , '${tag.titleRu}')`);
    }
    await queryRunner.query(`UPDATE "tag" SET "titleEn" = "name"`);
  }

  public async down(): Promise<void> {
    return;
  }
}
