import { ISetRedisDto } from '../dtos/ISetRedisDTO';

export interface IRedisProvider {
  get(key: string): Promise<string | undefined>;
  set(data: ISetRedisDto): Promise<string>;
  del(key: string): Promise<void>;
}
