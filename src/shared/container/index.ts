import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/users/repositories/interfaces/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

import './providers/';

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

console.log('💉 Containers started');
