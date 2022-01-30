import { container } from 'tsyringe';
import { RedisProvider } from './implementation/RedisProvaider';
import { IRedisProvider } from './model/IRedisProvider';

container.registerSingleton<IRedisProvider>('RedisProvider', RedisProvider);
