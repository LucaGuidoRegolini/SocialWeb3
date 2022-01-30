import { container } from 'tsyringe';
import { uploadConfig } from '@config/upload';

import IStorageProvider from './models/IStorageProvider';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import { IPFSStorageProvider } from './implementations/IPFSStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  ipfs: IPFSStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
