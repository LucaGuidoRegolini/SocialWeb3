import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'ipfs' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

export const uploadConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const extArray = file.mimetype.split('/');
        const extension = extArray[extArray.length - 1];
        const fileHash = crypto.randomBytes(15).toString('hex');
        const filename = `${fileHash}.${extension}`;

        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
