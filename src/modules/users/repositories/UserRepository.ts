import { getRepository, Repository } from 'typeorm';

import { IUserRepository } from './interfaces/IUserRepository';

import { IFilterReq } from '../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../shared/interfaces/IPaginatedRequest';
import IPaginatedResponse from '../../../shared/interfaces/IPaginatedResponse';
import { ICreateUserDto } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findBy(filters: IFilterReq<User>): Promise<User | undefined> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const user = await this.ormRepository.findOne(newFilter);

    return user;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const users = await this.ormRepository.find({
      where: newFilter,
      skip: limit * (page - 1),
      take: limit,
    });

    const total = await this.ormRepository.count();

    return {
      results: users,
      total,
      page,
      limit,
    };
  }

  public async create({
    name,
    email,
    password,
    phone,
    avatar,
    coverage,
  }: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      phone,
      avatar,
      coverage,
    });

    return await this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export { UserRepository };
