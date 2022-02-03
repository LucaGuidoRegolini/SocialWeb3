import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/users/repositories/interfaces/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

import { ISubscriptionRepository } from '@modules/users/repositories/interfaces/ISubscriptionRepository';
import { SubscriptionRepository } from '@modules/users/repositories/SubscriptionRepository';

import './providers/';

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);
container.registerSingleton<ISubscriptionRepository>(
  'SubscriptionRepository',
  SubscriptionRepository,
);

console.log('💉 Containers started');
