import { IFilterReq } from './IFilterReq';

interface IPaginatedRequest<T> extends IFilterReq<T> {
  page?: number;
  limit?: number;
}

export { IPaginatedRequest };
