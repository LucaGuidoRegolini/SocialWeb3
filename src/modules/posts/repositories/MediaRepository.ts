import { getRepository, Repository } from 'typeorm';

import { IMediaRepository } from './interfaces/IMediaRepository';

import { IFilterReq } from '../../../shared/interfaces/IFilterReq';
import { ICreateMediaDto } from '../dtos/ICreateMediaDTO';
import { Media } from '../entities/Media';

class MediaRepository implements IMediaRepository {
  private ormRepository: Repository<Media>;

  constructor() {
    this.ormRepository = getRepository(Media);
  }

  public async findBy(filters: IFilterReq<Media>): Promise<Media | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const media = await this.ormRepository.findOne(newFilter);

    return media;
  }

  public async indexBy(filters: IFilterReq<Media>): Promise<Media[]> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const medias = await this.ormRepository.find(newFilter);

    return medias;
  }

  public async create({ name, path, postId }: ICreateMediaDto): Promise<Media> {
    const media = this.ormRepository.create({
      name,
      path,
      post_id: postId,
    });

    await this.ormRepository.save(media);

    return media;
  }

  public async save(media: Media): Promise<Media> {
    return this.ormRepository.save(media);
  }

  public async delete(media: Media): Promise<void> {
    await this.ormRepository.remove(media);
  }
}

export { MediaRepository };
