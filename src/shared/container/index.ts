import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/users/repositories/interfaces/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/UserRepository';

import { ISubscriptionRepository } from '@modules/users/repositories/interfaces/ISubscriptionRepository';
import { SubscriptionRepository } from '@modules/users/repositories/SubscriptionRepository';

import { IPostRepository } from '@modules/posts/repositories/interfaces/IPostRepository';
import { PostRepository } from '@modules/posts/repositories/PostRepository';

import { IMediaRepository } from '@modules/posts/repositories/interfaces/IMediaRepository';
import { MediaRepository } from '@modules/posts/repositories/MediaRepository';

import { IReactionRepository } from '@modules/posts/repositories/interfaces/IReactionRepository';
import { ReactionRepository } from '@modules/posts/repositories/ReactionRepository';

import './providers/';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ISubscriptionRepository>(
  'SubscriptionRepository',
  SubscriptionRepository,
);

container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
container.registerSingleton<IMediaRepository>(
  'MediaRepository',
  MediaRepository,
);
container.registerSingleton<IReactionRepository>(
  'ReactionRepository',
  ReactionRepository,
);

console.log('💉 Containers started');
