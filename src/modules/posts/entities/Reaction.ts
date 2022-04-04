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
import { Exclude } from 'class-transformer';

import { reactionEnum } from 'enum/reactionEnum';

import { User } from '@modules/users/entities/User';
import { Post } from './Post';

@Entity('reactions')
class Reaction {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: reactionEnum,
  })
  reaction: reactionEnum;

  @Exclude()
  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  post_id: number;

  @ManyToOne(() => Post, post => post.reaction)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @UpdateDateColumn()
  updated_at!: Date;

  @CreateDateColumn()
  created_at!: Date;
}

export { Reaction };
