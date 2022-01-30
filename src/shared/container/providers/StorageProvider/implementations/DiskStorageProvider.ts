import fs from 'fs';
import path from 'path';
import { uploadConfig } from '@config/upload';
import AppError from '../../../../../errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    fs.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
      err => {
        if (err) throw new AppError('Error while saving file');
      },
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    fs.stat(filePath, (err, stats) => {
      if (err) return;
      fs.unlink(filePath, () => {});
    });
  }

  public async deleteFileInTmpFolder(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    fs.stat(filePath, (err, stats) => {
      if (err) return;
      fs.unlink(filePath, () => {});
    });
  }
}

export { DiskStorageProvider };
