import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IMedia, IProductStatus } from './interfaces/product.interface';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  production: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column('varchar', { array: true })
  tags: string[];

  @Column()
  productionGuarantee: string;

  @Column()
  description: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  media: IMedia[];

  @Column({ default: '' })
  cover: string;

  @Column({ default: 'ON_MODERATION' })
  status: IProductStatus;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
