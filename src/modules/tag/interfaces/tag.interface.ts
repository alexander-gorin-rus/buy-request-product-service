export interface INewTag {
  name: string;
  titleRu: string;
  titleEn: string;
}

export interface ITag extends INewTag {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTagRequest {
  tag: INewTag;
}

export interface IGetTagsRequest {
  tagId?: string;
}
