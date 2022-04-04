import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { reactionEnum } from 'enum/reactionEnum';

import { User } from '@modules/users/entities/User';
import { Media } from './Media';
import { Reaction } from './Reaction';

@Entity('posts')
class Post {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column('uuid')
  uuid: string;

  @Column({ nullable: true })
  content: string;

  @Exclude()
  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Media, media => media.post, { eager: true })
  media: Media[];

  @OneToMany(() => Reaction, reaction => reaction.post)
  reaction: Reaction[];

  @Exclude()
  @Column({ nullable: true })
  coment_id: number;

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({ name: 'coment_id' })
  comment: Post;

  @OneToMany(() => Post, post => post.comment)
  comments: Post[];

  @UpdateDateColumn()
  updated_at!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @Expose({ name: 'reactions_num' })
  getReactionsCount() {
    const object = {
      like: 0,
      dislike: 0,
      love: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    };

    if (this.reaction) {
      this.reaction.forEach(reaction => {
        object[reaction.reaction] = object[reaction.reaction] + 1;
      });
    }

    return object;
  }

  @Expose({ name: 'comments_num' })
  getCommentsCount() {
    if (this.comments) {
      return this.comments.length;
    }

    return 0;
  }
}

export { Post };
