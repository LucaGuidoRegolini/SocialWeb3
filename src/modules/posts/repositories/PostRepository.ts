import { getRepository, Repository } from 'typeorm';

import { IPostRepository } from './interfaces/IPostRepository';

import { IFilterReq } from '../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../shared/interfaces/IPaginatedResponse';
import { ICreatePostDto } from '../dtos/ICreatePostDTO';
import { Post } from '../entities/Post';

class PostRepository implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findBy(filters: IFilterReq<Post>): Promise<Post | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const post = await this.ormRepository.findOne(newFilter);

    return post;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Post>): Promise<IPaginatedResponse<Post>> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const post = await this.ormRepository.find({
      where: newFilter,
      skip: limit * (page - 1),
      take: limit,
    });

    const total = await this.ormRepository.count({
      where: newFilter,
    });

    return {
      results: post,
      total,
      page,
      limit,
    };
  }

  public async create({
    content,
    userId,
    commentId,
  }: ICreatePostDto): Promise<Post> {
    const post = this.ormRepository.create({
      content,
      user_id: userId,
      coment_id: commentId || undefined,
    });

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }

  public async delete(post: Post): Promise<void> {
    await this.ormRepository.remove(post);
  }
}

export { PostRepository };
