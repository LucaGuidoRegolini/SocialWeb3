import { IUserRepository } from '../interfaces/IUserRepository';

import { IFilterReq } from '../../../../shared/interfaces/IFilterReq';
import { IPaginatedRequest } from '../../../../shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '../../../../shared/interfaces/IPaginatedResponse';

import { User } from '../../entities/User';
import { ICreateUserDto } from '../../dtos/ICreateUserDTO';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findBy(filters: IFilterReq<User>): Promise<User | undefined> {
    const user = this.users.find(obj => {
      return (Object.keys(User) as Array<keyof typeof filters>).every(key => {
        return obj[key] === filters[key];
      });
    });

    return user;
  }

  public async listBy({
    page = 1,
    limit = 10,
    filters,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const newFilter = JSON.parse(JSON.stringify(filters));

    const users = this.users.filter(newFilter);

    return {
      results: users,
      total: this.users.length,
      page,
      limit,
    };
  }

  public async create(data: ICreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  public async delete(user: User): Promise<User> {
    this.users.splice(this.users.indexOf(user), 1);
    return user;
  }
}

export { FakeUserRepository };
