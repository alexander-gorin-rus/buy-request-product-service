import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateProductRequest,
  IDeleteProductRequest,
  IGetProductsForOfferRequest,
  IGetProductsRequest,
  IProduct,
  IUpdateProductRequest,
} from './interfaces/product.interface';
import { ProductService } from './product.service';
import {
  CommonIsSuccessResponse,
  GetDataResponseWithPage,
} from '../../common/types';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @GrpcMethod('ProductService')
  async createProduct(
    request: ICreateProductRequest,
  ): Promise<CommonIsSuccessResponse> {
    return await this.productService.createProduct(request);
  }

  @GrpcMethod('ProductService')
  async deleteProduct(
    request: IDeleteProductRequest,
  ): Promise<CommonIsSuccessResponse> {
    return await this.productService.deleteProduct(request);
  }

  @GrpcMethod('ProductService')
  async updateProduct(
    request: IUpdateProductRequest,
  ): Promise<CommonIsSuccessResponse> {
    return await this.productService.updateProduct(request);
  }

  @GrpcMethod('ProductService')
  async getProducts(
    request: IGetProductsRequest,
  ): Promise<GetDataResponseWithPage<IProduct>> {
    return await this.productService.getProducts(request);
  }

  @GrpcMethod('ProductService')
  async getProductsForOffer(
    request: IGetProductsForOfferRequest,
  ): Promise<GetDataResponseWithPage<IProduct>> {
    return await this.productService.getProductsForOffer(request);
  }
}
