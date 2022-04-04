import { IPostRepository } from '../interfaces/IPostRepository';

import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';
import { ICreatePostDto } from '@modules/posts/dtos/ICreatePostDto';

import { Post } from '@modules/posts/entities/Post';

class FakePostRepository implements IPostRepository {
  private posts: Post[] = [];

  public async findBy(filters: IFilterReq<Post>): Promise<Post | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const post = this.posts.find(newFilter);

    return post;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<Post>): Promise<IPaginatedResponse<Post>> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const posts = this.posts.filter(newFilter);

    return {
      results: posts,
      total: this.posts.length,
      page,
      limit,
    };
  }

  public async create(data: ICreatePostDto): Promise<Post> {
    const post = new Post();

    Object.assign(post, data);

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    this.posts.push(post);
    return post;
  }

  public async delete(post: Post): Promise<void> {
    this.posts.splice(this.posts.indexOf(post), 1);
    return;
  }
}

export { FakePostRepository };
