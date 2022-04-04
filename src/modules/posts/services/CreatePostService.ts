import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { AppError } from 'errors/AppError';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IPostRepository } from '../repositories/interfaces/IPostRepository';
import { IMediaRepository } from '../repositories/interfaces/IMediaRepository';

import { Post } from '../entities/Post';

interface IMedia {
  name: string;
  path: string;
}

interface IRequest {
  content: string;
  userUuid: string;
  postUuid?: string;
  medias: IMedia[];
}

@injectable()
class CreatePostService {
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
    content,
    userUuid,
    postUuid,
    medias,
  }: IRequest): Promise<Post> {
    const user = await this.userRepository.findBy({ uuid: userUuid });

    if (!user) {
      this.deleteMedia(medias);
      throw new AppError('Usuario não encontrado');
    }

    let originalPost;
    if (postUuid) {
      originalPost = await this.postRepository.findBy({
        uuid: postUuid,
      });

      if (!originalPost) {
        this.deleteMedia(medias);
        throw new AppError('Post não encontrado');
      }
    }

    const post = await this.postRepository.create({
      content,
      userId: user.id,
      commentId: originalPost ? originalPost.id : undefined,
    });

    await Promise.all(
      medias.map(async media => {
        const mediaFile = await this.storageProvider.saveFile(media.path);

        return this.mediaRepository.create({
          name: media.name,
          path: mediaFile,
          postId: post.id,
        });
      }),
    );

    const newPost = (await this.postRepository.findBy({ id: post.id })) as Post;

    return instanceToInstance(newPost);
  }

  public async deleteMedia(medias: IMedia[]) {
    await Promise.all(
      medias.map(async media => {
        await this.storageProvider.deleteFileInTmpFolder(media.path);
      }),
    );
  }
}

export { CreatePostService };
