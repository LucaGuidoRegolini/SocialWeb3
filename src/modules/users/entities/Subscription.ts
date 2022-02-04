import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from './User';

@Entity('subscriptions')
class Subscription {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column('uuid')
  uuid: string;

  @Exclude()
  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @Column()
  following_id: number;

  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'following_id' })
  followng: User;

  @CreateDateColumn()
  created_at!: Date;
}

export { Subscription };
