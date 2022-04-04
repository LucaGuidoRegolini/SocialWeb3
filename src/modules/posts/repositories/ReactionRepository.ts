import { getRepository, Repository } from 'typeorm';

import { IReactionRepository } from './interfaces/IReactionRepository';

import { IFilterReq } from '../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { Reaction } from '../entities/Reaction';
import { ICreateReactionDto } from '../dtos/ICreateReactionDTO';

class ReactionRepository implements IReactionRepository {
  private ormRepository: Repository<Reaction>;

  constructor() {
    this.ormRepository = getRepository(Reaction);
  }

  public async findBy(
    filters: IFilterReq<Reaction>,
  ): Promise<Reaction | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const reaction = await this.ormRepository.findOne(newFilter);

    return reaction;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Reaction>): Promise<IPaginatedResponse<Reaction>> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const reactions = await this.ormRepository.find({
      where: newFilter,
      skip: limit * (page - 1),
      take: limit,
    });

    const total = await this.ormRepository.count({
      where: newFilter,
    });

    return {
      results: reactions,
      total,
      page,
      limit,
    };
  }

  public async create({
    reaction,
    userId,
    postId,
  }: ICreateReactionDto): Promise<Reaction> {
    const newReaction = this.ormRepository.create({
      reaction,
      user_id: userId,
      post_id: postId,
    });

    await this.ormRepository.save(newReaction);

    return newReaction;
  }

  public async save(reaction: Reaction): Promise<Reaction> {
    return this.ormRepository.save(reaction);
  }

  public async delete(reaction: Reaction): Promise<void> {
    await this.ormRepository.remove(reaction);
  }
}

export { ReactionRepository };
