import { IRedisProvider } from '../model/IRedisProvider';

import { ISetRedisDto } from '../dtos/ISetRedisDTO';

interface IFakeRedis {
  key: string;
  value: any;
}

export class FakeRedisProvider implements IRedisProvider {
  private redis: IFakeRedis[] = [];

  public async get(key: string): Promise<string | undefined> {
    return this.redis.find(redis => redis.key === key)?.key;
  }

  public async set({
    key,
    value,
    time,
    option,
  }: ISetRedisDto): Promise<string> {
    this.redis.push({ key, value });
    return key;
  }

  public async del(key: string): Promise<void> {
    this.redis.splice(
      this.redis.findIndex(redis => redis.key === key),
      1,
    );
  }
}
