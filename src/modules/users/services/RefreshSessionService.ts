import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import { AppError } from '../../../errors/AppError';
import { User } from '../entities/User';
import { authConfig } from '@config/auth';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { ISessionDto } from '../dtos/ISessionDTO';

interface IRequest {
  refreshToken: string;
}

const { jwt, refreshToken: refreshTokenOptions } = authConfig;

@injectable()
class RefreshSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({ refreshToken }: IRequest): Promise<ISessionDto<User>> {
    const uuid = await this.redisProvider.get(refreshToken);

    if (!uuid) throw new AppError('Refresh token inválido', 401);

    const user = await this.usersRepository.findBy({ uuid });

    if (!user) throw new AppError('Refresh token inválido', 401);

    const newRefreshToken = await this.redisProvider.set({
      key: randomBytes(refreshTokenOptions.bytesSize).toString('hex'),
      value: user.uuid,
      time: refreshTokenOptions.expiresIn,
      option: 'EX',
    });

    await this.redisProvider.del(refreshToken);

    const accessToken = sign(
      {
        uuid: user.uuid,
        refresh: newRefreshToken,
        expiresIn: jwt.expiresIn,
      },
      jwt.secret,
    );

    return {
      result: instanceToInstance(user),
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }
}

export { RefreshSessionService };
