import { MigrationInterface, QueryRunner } from 'typeorm';

export class addValuesTitle1659426394137 implements MigrationInterface {
  private defaultTags: { name: string; titleRu: string; titleEn: string }[] = [
    {
      name: 'Headphones and audio equipment',
      titleEn: 'Headphones and audio equipment',
      titleRu: 'Наушники и аудиотехника',
    },
    {
      name: 'Video equipment',
      titleEn: 'Video equipment',
      titleRu: 'Видеотехника',
    },
    {
      name: 'Photo and video cameras',
      titleEn: 'Photo and video cameras',
      titleRu: 'Фото- и видеокамеры',
    },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const tag of this.defaultTags) {
      await queryRunner.query(`INSERT INTO "tag" ("name" , "titleRu" , "titleEn")
    VALUES ('${tag.name}' , '${tag.titleRu}', '${tag.titleEn}')`);
    }
  }

  public async down(): Promise<void> {
    return;
  }
}
