import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '../../../errors/AppError';
import { User } from '../entities/User';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  coverage?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    phone,
    avatar,
    coverage,
  }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findBy({ email });

    if (userExists) {
      if (avatar) await this.storageProvider.deleteFileInTmpFolder(avatar);
      if (coverage) await this.storageProvider.deleteFileInTmpFolder(coverage);
      throw new AppError('E-mail já cadastrado', 400);
    }

    const userAvatar = avatar
      ? await this.storageProvider.saveFile(avatar)
      : undefined;

    const userCoverage = coverage
      ? await this.storageProvider.saveFile(coverage)
      : undefined;

    if (avatar) await this.storageProvider.deleteFileInTmpFolder(avatar);
    if (coverage) await this.storageProvider.deleteFileInTmpFolder(coverage);

    const user = await this.usersRepository.create({
      name,
      email,
      password,
      phone,
      avatar: userAvatar,
      coverage: userCoverage,
    });

    return instanceToInstance(user);
  }
}

export { CreateUserService };
