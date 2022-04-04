import { instanceToInstance } from 'class-transformer';

import { injectable, inject } from 'tsyringe';

import { Subscription } from '../entities/Subscription';
import { AppError } from 'errors/AppError';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { ISubscriptionRepository } from '../repositories/interfaces/ISubscriptionRepository';

interface IRequest {
  userUuid: string;
  followUuid: string;
}

@injectable()
class AddSubscriptionService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository,
  ) {}

  public async execute({
    userUuid,
    followUuid,
  }: IRequest): Promise<Subscription> {
    const user = await this.usersRepository.findBy({ uuid: userUuid });
    const follow = await this.usersRepository.findBy({ uuid: followUuid });

    if (!user || !follow)
      throw new AppError('Usuario ou seguidor não encontrado');

    const subscription = await this.subscriptionRepository.create({
      userId: user.id,
      followingId: follow.id,
    });

    return instanceToInstance(subscription);
  }
}

export { AddSubscriptionService };
