import IPaginatedResponse from '@shared/interfaces/IPaginatedResponse';
import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { User } from '../entities/User';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IRequest {
  uuid: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ uuid }: IRequest): Promise<User> {
    const user = await this.usersRepository.findBy({ uuid });

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    return instanceToInstance(user);
  }
}

export { ShowUserService };
