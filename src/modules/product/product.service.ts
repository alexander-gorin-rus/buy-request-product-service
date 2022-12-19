import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Raw, Repository } from 'typeorm';
import { CommonService } from '../../common/common.service';
import {
  ICreateProductRequest,
  IDeleteProductRequest,
  IGetProductsForOfferRequest,
  IGetProductsRequest,
  INewProduct,
  IProduct,
  IUpdateProductRequest,
  IUpdateSettings,
} from './interfaces/product.interface';
import Product from './product.entity';
import {
  CommonIsSuccessResponse,
  GetDataResponseWithPage,
} from '../../common/types';

@Injectable()
export class ProductService extends CommonService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
  async createProduct(
    request: ICreateProductRequest,
  ): Promise<CommonIsSuccessResponse> {
    const { product } = request;
    try {
      await this.save<INewProduct, IProduct>(product);
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async deleteProduct(
    request: IDeleteProductRequest,
  ): Promise<CommonIsSuccessResponse> {
    try {
      const { id } = request;
      await this.remove(id);
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async updateProduct(
    request: IUpdateProductRequest,
  ): Promise<CommonIsSuccessResponse> {
    try {
      const {
        product: {
          id,
          name,
          description,
          status,
          media,
          cover,
          production,
          productionGuarantee,
          tags,
          model,
        },
      } = request;
      const setting = await this.findOneByCriteria<IUpdateSettings>({
        where: { id },
      });
      await this.save<IUpdateSettings, IUpdateSettings>({
        ...setting,
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(status ? { status } : {}),
        ...(media ? { media } : {}),
        ...(cover ? { cover } : {}),
        ...(production ? { production } : {}),
        ...(productionGuarantee ? { productionGuarantee } : {}),
        ...(tags ? { tags } : {}),
        ...(model ? { model } : {}),
      });
      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async getProducts(
    request: IGetProductsRequest,
  ): Promise<GetDataResponseWithPage<IProduct>> {
    const { page, perPage, status, productId, userId, sort } = request;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      const [products, totalCount] =
        await this.findAndCountByCriteria<IProduct>({
          where: {
            ...(userId ? { userId: userId } : {}),
            ...(productId ? { id: productId } : {}),
            ...(status ? { status } : {}),
          },
          order: {
            ...(sort
              ? Object.assign(
                  {},
                  ...sort.map((sortArray) => {
                    return { [sortArray.orderName]: sortArray.orderBy };
                  }),
                )
              : {}),
          },
          ...(page ? { skip } : {}),
          ...(perPage ? { take: perPage } : {}),
        });
      return {
        data: products,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page,
          perPage,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }

  async getProductsForOffer(
    request: IGetProductsForOfferRequest,
  ): Promise<GetDataResponseWithPage<IProduct>> {
    const { page, perPage, sort, tagNames, productIds } = request;
    const skip = perPage ? perPage * (page - 1) : 1;
    try {
      const [products, totalCount] =
        await this.findAndCountByCriteria<IProduct>({
          where: {
            ...(tagNames
              ? {
                  tags: Raw(
                    (tagsAlias) =>
                      `${tagsAlias} && ARRAY[:...tagNames]::varchar[]`,
                    { tagNames },
                  ),
                }
              : {}),
            ...(productIds ? { id: In(productIds) } : {}),
          },
          order: {
            ...(sort
              ? Object.assign(
                  {},
                  ...sort.map((sortArray) => {
                    return { [sortArray.orderName]: sortArray.orderBy };
                  }),
                )
              : {}),
          },
          ...(page ? { skip } : {}),
          ...(perPage ? { take: perPage } : {}),
        });
      return {
        data: products,
        pageInfo: {
          page,
          perPage,
          totalCount,
          totalPageCount: Math.ceil(totalCount / (perPage ? perPage : 1)),
        },
      };
    } catch (error) {
      return {
        data: [],
        pageInfo: {
          page,
          perPage,
          totalCount: 0,
          totalPageCount: 0,
        },
        error,
      };
    }
  }
}
