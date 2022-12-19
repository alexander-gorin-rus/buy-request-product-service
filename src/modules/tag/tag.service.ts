import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../../common/common.service';
import {
  ICreateTagRequest,
  IGetTagsRequest,
  INewTag,
  ITag,
} from './interfaces/tag.interface';
import Tag from './tag.entity';
import { CommonIsSuccessResponse, GetDataResponse } from '../../common/types';

@Injectable()
export class TagService extends CommonService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {
    super(tagRepository);
  }

  async createTag(
    request: ICreateTagRequest,
  ): Promise<CommonIsSuccessResponse> {
    try {
      const { tag } = request;

      const oldTag = await this.findOneByCriteria({
        where: {
          name: tag.name,
        },
      });

      if (oldTag)
        return {
          isSuccess: false,
          error: {
            code: 'TAG_ID_ALREADY_EXISTS',
            message: ['TAG_ID_ALREADY_EXISTS'],
          },
        };

      await this.save<INewTag, Tag>(tag);

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

  async getTags(request: IGetTagsRequest): Promise<GetDataResponse<ITag>> {
    try {
      const { tagId } = request;

      const tags: ITag[] = await this.findByCriteria({
        where: {
          ...(tagId && { id: tagId }),
        },
        order: {
          name: 'ASC',
        },
      });

      return {
        data: tags,
      };
    } catch (error) {
      return {
        data: [],
        error,
      };
    }
  }
}
