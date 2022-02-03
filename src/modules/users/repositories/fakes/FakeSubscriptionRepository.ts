import { ISubscriptionRepository } from '../interfaces/ISubscriptionRepository';

import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';

import { Subscription } from '../../entities/Subscription';
import { ICreateSubDto } from '../../dtos/ICreateSubDTO';

class FakeSubscriptionRepository implements ISubscriptionRepository {
  private subs: Subscription[] = [];

  public async findBy(
    filters: IFilterReq<Subscription>,
  ): Promise<Subscription | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const sub = this.subs.find(newFilter);

    return sub;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Subscription>): Promise<
    IPaginatedResponse<Subscription>
  > {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const sub = this.subs.filter(newFilter);

    return {
      results: sub,
      total: this.subs.length,
      page,
      limit,
    };
  }

  public async create(data: ICreateSubDto): Promise<Subscription> {
    const sub = new Subscription();

    Object.assign(sub, data);

    this.subs.push(sub);

    return sub;
  }

  public async save(sub: Subscription): Promise<Subscription> {
    this.subs.push(sub);
    return sub;
  }

  public async delete(sub: Subscription): Promise<void> {
    this.subs.splice(this.subs.indexOf(sub), 1);
    return;
  }
}

export { FakeSubscriptionRepository };
