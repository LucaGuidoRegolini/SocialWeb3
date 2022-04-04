import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { AppError } from 'errors/AppError';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IPostRepository } from '../repositories/interfaces/IPostRepository';
import { IMediaRepository } from '../repositories/interfaces/IMediaRepository';

import { Post } from '../entities/Post';

interface IMedia {
  name: string;
  hash: string;
}

interface IRequest {
  postUuid: string;
  page: number;
  limit: number;
}

@injectable()
class ListComentsService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('MediaRepository')
    private mediaRepository: IMediaRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    postUuid,
    page = 1,
    limit = 10,
  }: IRequest): Promise<IPaginatedResponse<Post>> {
    const post = await this.postRepository.findBy({ uuid: postUuid });
    if (!post) throw new AppError('Post não encontrado');

    const comments = await this.postRepository.listBy({
      page,
      limit,
      filters: {
        coment_id: post.id,
      },
    });

    return {
      results: instanceToInstance(comments.results),
      total: comments.total,
      limit: comments.limit,
      page: comments.page,
    };
  }
}

export { ListComentsService };
