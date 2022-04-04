import { ICreateReactionDto } from '@modules/posts/dtos/ICreateReactionDTO';
import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';

import { Reaction } from '../../entities/Reaction';

export interface IReactionRepository {
  findBy(filters: IFilterReq<Reaction>): Promise<Reaction | undefined>;
  listBy(
    data: IPaginatedRequest<Reaction>,
  ): Promise<IPaginatedResponse<Reaction>>;
  create(reaction: ICreateReactionDto): Promise<Reaction>;
  save(reaction: Reaction): Promise<Reaction>;
  delete(reaction: Reaction): Promise<void>;
}
