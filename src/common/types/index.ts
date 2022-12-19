export interface IPageInfo {
  page: number;
  perPage: number;
  totalCount: number;
  totalPageCount: number;
}

export interface IError {
  code: string;
  message: Array<string>;
}

export type CommonIsSuccessResponse = ICommonSuccess | ICommonFailure;

interface ICommonSuccess {
  isSuccess: true;
}

interface ICommonFailure {
  isSuccess: false;
  error: IError;
}

export type GetDataResponseWithPage<D> =
  | ISuccessDataWithPage<D>
  | IFailureDataWithPage;

export type GetDataResponse<D> =
  | Omit<ISuccessDataWithPage<D>, 'pageInfo'>
  | Omit<IFailureDataWithPage, 'pageInfo'>;

interface ISuccessDataWithPage<D> {
  data: D[];
  pageInfo: IPageInfo;
}

interface IFailureDataWithPage {
  data: [];
  pageInfo: IPageInfo;
  error: IError;
}

export interface ISort {
  orderBy: string;
  orderName: string;
}
