import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { AppError } from 'errors/AppError';
import { reactionEnum } from 'enum/reactionEnum';

import { IPostRepository } from '../repositories/interfaces/IPostRepository';
import { IReactionRepository } from '../repositories/interfaces/IReactionRepository';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';

import { Reaction } from '../entities/Reaction';

interface IRequest {
  postUuid: string;
  userUuid: string;
  reaction: reactionEnum;
}

@injectable()
class AddReactionService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,

    @inject('ReactionRepository')
    private reactionRepository: IReactionRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    postUuid,
    userUuid,
    reaction,
  }: IRequest): Promise<Reaction> {
    const user = await this.userRepository.findBy({ uuid: userUuid });
    if (!user) throw new AppError('Usuario não encontrado');

    const post = await this.postRepository.findBy({ uuid: postUuid });
    if (!post) throw new AppError('Post não encontrado');

    const reactionExists = await this.reactionRepository.findBy({
      post_id: post.id,
      user_id: user.id,
    });

    let newReaction: Reaction;

    if (reactionExists) {
      Object.assign(reactionExists, {
        reaction,
      });
      newReaction = await this.reactionRepository.save(reactionExists);
    } else {
      newReaction = await this.reactionRepository.create({
        postId: post.id,
        userId: user.id,
        reaction,
      });
    }

    return instanceToInstance(newReaction);
  }
}

export { AddReactionService };
