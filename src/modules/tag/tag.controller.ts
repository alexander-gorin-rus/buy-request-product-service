import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateTagRequest,
  IGetTagsRequest,
  ITag,
} from './interfaces/tag.interface';
import { TagService } from './tag.service';
import { CommonIsSuccessResponse, GetDataResponse } from '../../common/types';

@Controller()
export class TagController {
  constructor(private tagService: TagService) {}

  @GrpcMethod('ProductService')
  async createTag(
    request: ICreateTagRequest,
  ): Promise<CommonIsSuccessResponse> {
    return await this.tagService.createTag(request);
  }

  @GrpcMethod('ProductService')
  async getTags(request: IGetTagsRequest): Promise<GetDataResponse<ITag>> {
    return await this.tagService.getTags(request);
  }
}
