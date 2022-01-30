import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import IPaginatedResponse from '../../../../shared/interfaces/IPaginatedResponse';
import { ICreateSubDto } from '../../dtos/ICreateSubDTO';

import { Subscription } from '../../entities/Subscription';

export interface ISubscriptionRepository {
  findBy(filters: IFilterReq<Subscription>): Promise<Subscription | undefined>;
  listBy(
    data: IPaginatedRequest<Subscription>,
  ): Promise<IPaginatedResponse<Subscription>>;
  create(sub: ICreateSubDto): Promise<Subscription>;
  save(sub: Subscription): Promise<Subscription>;
}
