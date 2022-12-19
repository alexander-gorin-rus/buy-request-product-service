import { ISort } from '../../../common/types';

export enum IProductStatus {
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
  ON_MODERATION = 'ON_MODERATION',
}

export interface IMedia {
  fileOriginalName: string;
  fileNameMinio: string;
  mimetype: string;
}

export interface INewProduct {
  userId: string;
  production: string;
  name: string;
  model: string;
  tags: string[];
  productionGuarantee: string;
  description: string;
  media: IMedia[];
  cover: string;
  status?: IProductStatus;
}

export interface IProduct extends INewProduct {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateProductRequest {
  product: INewProduct;
}

export interface IGetProductsRequest {
  userId?: string;
  productId?: string;
  page?: number;
  perPage?: number;
  sort?: ISort[];
  status?: IProductStatus;
}

export interface IGetProductsForOfferRequest {
  sort?: ISort[];
  tagNames: string[];
  productIds: string[];
  page?: number;
  perPage?: number;
}

export interface IDeleteProductRequest {
  id: string;
}

export interface IUpdateSettings {
  id: string;
  userId: string;
  name: string;
  description: string;
  tags: string[];
  model: string;
  productionGuarantee: string;
  production: string;
  status?: IProductStatus;
  media: IMedia[];
  cover: string;
}

export interface IUpdateProductRequest {
  product: IUpdateSettings;
}
