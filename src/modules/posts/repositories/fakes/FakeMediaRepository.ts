import { IMediaRepository } from '../interfaces/IMediaRepository';

import { IFilterReq } from '@shared/interfaces/IFilterReq';
import { ICreateMediaDto } from '@modules/posts/dtos/ICreateMediaDTO';

import { Media } from '@modules/posts/entities/Media';

class FakeMediaRepository implements IMediaRepository {
  private media: Media[] = [];

  public async findBy(filters: IFilterReq<Media>): Promise<Media | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const media = this.media.find(newFilter);

    return media;
  }

  public async indexBy(filters: IFilterReq<Media>): Promise<Media[]> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const medias = this.media.filter(newFilter);

    return medias;
  }

  public async create(data: ICreateMediaDto): Promise<Media> {
    const media = new Media();

    Object.assign(media, {
      ...data,
    });

    this.media.push(media);

    return media;
  }

  public async save(media: Media): Promise<Media> {
    this.media.push(media);
    return media;
  }

  public async delete(media: Media): Promise<void> {
    const index = this.media.findIndex(m => m.id === media.id);
    this.media.splice(index, 1);
  }
}

export { FakeMediaRepository };
