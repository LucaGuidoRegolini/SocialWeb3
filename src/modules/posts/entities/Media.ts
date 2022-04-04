import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Post } from './Post';

@Entity('medias')
class Media {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  post_id: number;

  @ManyToOne(() => Post, post => post.media)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @CreateDateColumn()
  created_at!: Date;

  @Expose({ name: 'media_url' })
  getAvatarUrl() {
    if (this.path) return `${process.env.API_URL}/files/${this.path}`;
    return `${process.env.API_URL}/files/default-avatar.png`;
  }
}

export { Media };
