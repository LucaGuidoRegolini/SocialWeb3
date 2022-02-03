import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { Subscription } from '../entities/Subscription';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { AppError } from 'errors/AppError';

import { ISubscriptionRepository } from '../repositories/interfaces/ISubscriptionRepository';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IRequest {
  userUuid: string;
  page: number;
  limit: number;
}

@injectable()
class ShowSubscriptionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository,
  ) {}

  public async execute({
    userUuid,
    page = 1,
    limit = 10,
  }: IRequest): Promise<IPaginatedResponse<Subscription>> {
    const user = await this.usersRepository.findBy({ uuid: userUuid });

    if (!user) throw new AppError('Usuário não encontrado');

    const subscriptions = await this.subscriptionRepository.listBy({
      page,
      limit,
      filters: {
        following_id: user.id,
      },
    });

    return instanceToInstance(subscriptions);
  }
}

export { ShowSubscriptionsService };
