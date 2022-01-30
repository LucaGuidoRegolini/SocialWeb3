import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import IPaginatedResponse from '../../../../shared/interfaces/IPaginatedResponse';
import { ICreateUserDto } from '../../dtos/ICreateUserDTO';

import { User } from '../../entities/User';

export interface IUserRepository {
  findBy(filters: IFilterReq<User>): Promise<User | undefined>;
  listBy(data: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>>;
  create(user: ICreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
