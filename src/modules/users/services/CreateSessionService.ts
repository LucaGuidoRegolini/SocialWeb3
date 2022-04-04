import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import { AppError } from '../../../errors/AppError';
import { User } from '../entities/User';
import { authConfig } from '@config/auth';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IRedisProvider } from '@shared/container/providers/RedisProvider/model/IRedisProvider';
import { ISessionDto } from '../dtos/ISessionDTO';

interface IRequest {
  email: string;
  password: string;
}

const { jwt, refreshToken: refreshTokenOptions } = authConfig;

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<ISessionDto<User>> {
    const user = await this.usersRepository.findBy({ email });

    if (!user) throw new AppError('Email e senha não combinam', 401);

    if (!(await compare(password, user.password)))
      throw new AppError('Email e senha não combinam', 401);

    const refreshToken = await this.redisProvider.set({
      key: randomBytes(refreshTokenOptions.bytesSize).toString('hex'),
      value: user.uuid,
      time: refreshTokenOptions.expiresIn,
      option: 'EX',
    });

    const accessToken = sign(
      {
        uuid: user.uuid,
        refresh: refreshToken,
        expiresIn: jwt.expiresIn,
      },
      jwt.secret,
    );

    return {
      result: instanceToInstance(user),
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}

export { CreateSessionService };
