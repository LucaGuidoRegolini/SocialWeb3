import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { AppError } from '../../../errors/AppError';
import { User } from '../entities/User';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IRequest {
  uuid: string;
  name?: string;
  phone?: string;
  avatar?: string;
  coverage?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    uuid,
    name,
    phone,
    avatar,
    coverage,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findBy({ uuid });

    if (!user) {
      if (avatar) await this.storageProvider.deleteFileInTmpFolder(avatar);
      if (coverage) await this.storageProvider.deleteFileInTmpFolder(coverage);
      throw new AppError('Usuario não encontrado', 400);
    }

    const userAvatar = avatar
      ? await this.storageProvider.saveFile(avatar)
      : undefined;

    const userCoverage = coverage
      ? await this.storageProvider.saveFile(coverage)
      : undefined;

    if (avatar) await this.storageProvider.deleteFileInTmpFolder(avatar);
    if (coverage) await this.storageProvider.deleteFileInTmpFolder(coverage);

    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);
    if (user.coverage) await this.storageProvider.deleteFile(user.coverage);

    Object.assign(user, {
      name,
      phone,
      avatar: userAvatar,
      coverage: userCoverage,
    });

    await this.usersRepository.save(user);

    return instanceToInstance(user);
  }
}

export { UpdateUserService };
