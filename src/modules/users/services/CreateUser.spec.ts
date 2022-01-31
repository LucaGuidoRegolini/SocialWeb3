import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { AppError } from '../../../errors/AppError';

import { CreateUserService } from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;

let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeStorageProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jest@teste.com',
      password: '123456',
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('jest@teste.com');
  });

  it('should not be able to create a new user with email of another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jest',
      password: '123456',
    });

    const resp = createUser.execute({
      name: 'John Doe',
      email: 'jest',
      password: '123456',
    });

    await expect(resp).rejects.toBeInstanceOf(AppError);
  });
});
