import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { AppError } from '../../../errors/AppError';

import { ShowUserService } from './ShowUserService';

let fakeUserRepository: FakeUserRepository;

let showUser: ShowUserService;

describe('ShowUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showUser = new ShowUserService(fakeUserRepository);
  });

  it('should be able to show a user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jest@teste.com',
      password: '123456',
    });

    const findUser = await showUser.execute({
      uuid: user.uuid,
    });

    expect(findUser.name).toBe(user.name);
    expect(findUser.email).toBe(user.email);
  });

  it('should not be able to show a user if not exist', async () => {
    const resp = showUser.execute({
      uuid: 'no-uuid',
    });

    await expect(resp).rejects.toBeInstanceOf(AppError);
  });
});
