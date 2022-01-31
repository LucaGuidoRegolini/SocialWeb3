import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { UserController } from '../controllers/UserController';
import { create } from './validations/user.validation';
import { ensureAuthenticated } from '@shared/server/middlewares/ensureAuthenticated';

const userController = new UserController();

const upload = multer({
  storage: uploadConfig.multer.storage,
  limits: { fileSize: 2097152 },
});

const userRouter = Router();

userRouter.post(
  '/',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverage', maxCount: 1 },
  ]),
  create,
  userController.create,
);

userRouter.use(ensureAuthenticated);

userRouter.get('/me', userController.show);

export { userRouter };
