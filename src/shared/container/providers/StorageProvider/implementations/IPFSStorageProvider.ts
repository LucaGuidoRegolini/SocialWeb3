import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import mime from 'mime';
import IPFS from 'ipfs-core';
import { uploadConfig } from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import { AppError } from 'errors/AppError';

class IPFSStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const node = await IPFS.create();

    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('Arquivo não encontrada');
    }

    const fileContent = await promisify(fs.readFile)(originalPath);

    let resp;
    try {
      const { cid } = await node.add({
        context: fileContent,
      });
      resp = cid;
    } catch (err) {
      throw new AppError('Erro ao realizar upload');
    }

    await promisify(fs.unlink)(originalPath);

    return resp.toString();
  }

  public async deleteFile(file: string): Promise<void> {
    return;
  }

  public async deleteFileInTmpFolder(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    try {
      await promisify(fs.stat)(filePath);
    } catch {
      return;
    }

    await promisify(fs.unlink)(filePath);
  }
}

export { IPFSStorageProvider };
