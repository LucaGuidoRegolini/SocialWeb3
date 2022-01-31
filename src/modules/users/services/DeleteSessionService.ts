import { injectable, inject } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';

interface IRequest {
  refreshToken: string;
}

@injectable()
class DeleteSessionService {
  constructor(
    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({ refreshToken }: IRequest): Promise<void> {
    const tokenExists = await this.redisProvider.get(refreshToken);

    if (!tokenExists) throw new AppError('Refresh token inválido', 401);

    await this.redisProvider.del(refreshToken);
  }
}

export { DeleteSessionService };
