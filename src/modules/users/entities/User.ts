import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { hashSync } from 'bcryptjs';

import { Subscription } from './Subscription';

@Entity('users')
class User {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: false })
  email_active: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  phone_active: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  coverage: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  blocked_at: Date;

  @OneToMany(() => Subscription, sub => sub.user)
  followng: Subscription[];

  @UpdateDateColumn()
  updated_at!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl() {
    if (this.avatar) return `${process.env.API_URL}/files/${this.avatar}`;
    return `${process.env.API_URL}/files/default-avatar.png`;
  }

  @Expose({ name: 'coverage_url' })
  getCoverageUrl() {
    if (this.coverage) return `${process.env.API_URL}/files/${this.coverage}`;
    return `${process.env.API_URL}/files/default-coverage.png`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    if (this.password) this.password = hashSync(this.password, 10);
  }
}

export { User };
