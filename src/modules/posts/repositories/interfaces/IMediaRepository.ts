import { ICreateMediaDto } from '@modules/posts/dtos/ICreateMediaDTO';
import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';

import { Media } from '../../entities/Media';

export interface IMediaRepository {
  findBy(filters: IFilterReq<Media>): Promise<Media | undefined>;
  indexBy(filters: IFilterReq<Media>): Promise<Media[]>;
  create(media: ICreateMediaDto): Promise<Media>;
  save(media: Media): Promise<Media>;
  delete(media: Media): Promise<void>;
}
