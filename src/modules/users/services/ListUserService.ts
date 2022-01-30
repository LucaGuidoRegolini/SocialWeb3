import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { User } from '../entities/User';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IRequest {
  page?: number;
  limit?: number;
  filters?: {
    name?: string;
    email?: string;
    phone?: string;
    is_active?: boolean;
  };
}

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
    filters,
  }: IRequest): Promise<IPaginatedResponse<User>> {
    const users = await this.usersRepository.listBy({
      page,
      limit,
      filters,
    });

    return instanceToInstance(users);
  }
}

export { ListUserService };
