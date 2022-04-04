import { injectable, inject } from 'tsyringe';

import { AppError } from 'errors/AppError';

import { ISubscriptionRepository } from '../repositories/interfaces/ISubscriptionRepository';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IRequest {
  uuid: string;
  userUuid: string;
}

@injectable()
class RemoveSubcriptionService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository,
  ) {}

  public async execute({ uuid, userUuid }: IRequest): Promise<void> {
    const user = await this.usersRepository.findBy({ uuid: userUuid });
    if (!user) throw new AppError('Usuario não encontrado', 404);

    const subscription = await this.subscriptionRepository.findBy({
      uuid,
      user_id: user.id,
    });

    if (!subscription) throw new AppError('subinscrição não encontrada');

    await this.subscriptionRepository.delete(subscription);
  }
}

export { RemoveSubcriptionService };
