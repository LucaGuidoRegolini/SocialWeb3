import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';
import { ICreatePostDto } from '../../dtos/ICreatePostDTO';

import { Post } from '../../entities/Post';

export interface IPostRepository {
  findBy(filters: IFilterReq<Post>): Promise<Post | undefined>;
  listBy(data: IPaginatedRequest<Post>): Promise<IPaginatedResponse<Post>>;
  create(post: ICreatePostDto): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(post: Post): Promise<void>;
}
