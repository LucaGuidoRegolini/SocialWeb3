import { getRepository, Repository } from 'typeorm';

import { ISubscriptionRepository } from './interfaces/ISubscriptionRepository';

import { IFilterReq } from '../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Subscription } from '../entities/Subscription';
import { ICreateSubDto } from '../dtos/ICreateSubDTO';

class SubscriptionRepository implements ISubscriptionRepository {
  private ormRepository: Repository<Subscription>;

  constructor() {
    this.ormRepository = getRepository(Subscription);
  }

  public async findBy(
    filters: IFilterReq<Subscription>,
  ): Promise<Subscription | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const sub = await this.ormRepository.findOne(newFilter);

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

    const sub = await this.ormRepository.find({
      where: newFilter,
      skip: limit * (page - 1),
      take: limit,
    });

    const total = await this.ormRepository.count({
      where: newFilter,
    });

    return {
      results: sub,
      total,
      page,
      limit,
    };
  }

  public async create({
    userId,
    followingId,
  }: ICreateSubDto): Promise<Subscription> {
    const sub = this.ormRepository.create({
      user_id: userId,
      following_id: followingId,
    });

    return this.ormRepository.save(sub);
  }

  public async save(sub: Subscription): Promise<Subscription> {
    return this.ormRepository.save(sub);
  }

  public async delete(sub: Subscription): Promise<void> {
    await this.ormRepository.remove(sub);
  }
}

export { SubscriptionRepository };
