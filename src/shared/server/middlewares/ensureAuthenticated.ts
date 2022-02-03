import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { RedisProvider } from '@shared/container/providers/RedisProvider/implementation/RedisProvaider';

import { AppError } from 'errors/AppError';
import { authConfig } from '@config/auth';
import { container } from 'tsyringe';

interface ITokenPayload {
  iat: number;
  exp: number;
  uuid: string;
  refresh: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  const redisProvider = container.resolve(RedisProvider);

  if (!authHeader) {
    throw new AppError('Token JWT inexistente!', 404);
  }

  const [method, token] = authHeader.split(' ');

  if (method !== 'Bearer') throw new AppError('Token JWT inválido!', 401);

  try {
    const decoded = verify(token, authConfig.jwt.secret as string);

    const { uuid, refresh, exp } = decoded as ITokenPayload;

    const tokenExpired = exp < Date.now() / 1000;
    if (tokenExpired) throw new AppError('Token JWT expirado!', 401);

    const redisUuid = await redisProvider.get(refresh);

    if (redisUuid !== uuid) throw new AppError('Token JWT inválido!', 401);

    request.user = {
      uuid,
    };

    return next();
  } catch (error) {
    throw new AppError('Token Inválido', 401);
  }
}
