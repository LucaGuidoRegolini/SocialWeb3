import Redis from 'ioredis';
import { injectable, singleton } from 'tsyringe';

import { ISetRedisDto } from '../dtos/ISetRedisDTO';
import { IRedisProvider } from '../model/IRedisProvider';

const { REDIS_HOST, REDIS_PORT, REDIS_PASS, REDIS_DB } = process.env;

@singleton()
export class RedisProvider implements IRedisProvider {
  private redis: Redis.Redis = new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT || '6379'),
    password: REDIS_PASS,
    keyPrefix: `${REDIS_DB || 'app-db'}-`,
  });

  public async get(key: string): Promise<string | undefined> {
    return (await this.redis.get(key)) || undefined;
  }

  public async set({
    key,
    value,
    time,
    option,
  }: ISetRedisDto): Promise<string> {
    await this.redis.set(key, value, option, time);
    return key;
  }

  public async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
