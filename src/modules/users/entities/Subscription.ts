import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { User } from './User';

@Entity('subscriptions')
class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  uuid: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  following_id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'following_id' })
  followng: User;

  @CreateDateColumn()
  created_at!: Date;
}

export { Subscription };
