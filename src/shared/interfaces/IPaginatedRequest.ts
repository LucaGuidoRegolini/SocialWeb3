import { IFilterReq } from './IFilterReq';

interface IPaginatedRequest<T> {
  page?: number;
  limit?: number;
  filters?: IFilterReq<T>;
}

export { IPaginatedRequest };
