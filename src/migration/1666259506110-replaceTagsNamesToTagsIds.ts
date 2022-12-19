import { MigrationInterface, QueryRunner } from 'typeorm';

export class replaceTagsNamesToTagsIds1666259506110
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = await queryRunner.query(`SELECT * FROM public.tag`);
    const products = await queryRunner.query(`SELECT * FROM public.product`);

    for (const product of products) {
      const newTags = tags.filter((tag) => product.tags.includes(tag.name));
      await queryRunner.query(
        `UPDATE public.product SET tags='{${newTags.map(
          (tag) => tag.id,
        )}}' WHERE id='${product.id}'`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tags = await queryRunner.query(`SELECT * FROM public.tag`);
    const products = await queryRunner.query(`SELECT * FROM public.product`);

    for (const product of products) {
      const newTags = tags.filter((tag) => product.tags.includes(tag.id));
      await queryRunner.query(
        `UPDATE public.product SET tags='{${newTags.map(
          (tag) => tag.name,
        )}}' WHERE id='${product.id}'`,
      );
    }
  }
}
