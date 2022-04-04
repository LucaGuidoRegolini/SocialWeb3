import { IReactionRepository } from '../interfaces/IReactionRepository';

import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';
import { ICreateReactionDto } from '@modules/posts/dtos/ICreateReactionDTO';

import { Reaction } from '@modules/posts/entities/Reaction';

class FakeReactionRepository implements IReactionRepository {
  private reactions: Reaction[] = [];

  public async findBy(
    filters: IFilterReq<Reaction>,
  ): Promise<Reaction | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const post = this.reactions.find(newFilter);

    return post;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Reaction>): Promise<IPaginatedResponse<Reaction>> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const reactions = this.reactions.filter(newFilter);

    return {
      results: reactions,
      total: this.reactions.length,
      page,
      limit,
    };
  }

  public async create(data: ICreateReactionDto): Promise<Reaction> {
    const reaction = new Reaction();

    Object.assign(reaction, data);

    this.reactions.push(reaction);

    return reaction;
  }

  public async save(reaction: Reaction): Promise<Reaction> {
    this.reactions.push(reaction);
    return reaction;
  }

  public async delete(reaction: Reaction): Promise<void> {
    this.reactions.splice(this.reactions.indexOf(reaction), 1);
    return;
  }
}

export { FakeReactionRepository };
