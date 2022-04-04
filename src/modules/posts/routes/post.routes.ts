import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { PostController } from '../controllers/PostController';

import { ensureAuthenticated } from '@shared/server/middlewares/ensureAuthenticated';

const postController = new PostController();

const upload = multer({
  storage: uploadConfig.multer.storage,
  limits: { fileSize: 2097152 },
});

const postRouter = Router();

postRouter.use(ensureAuthenticated);

postRouter.post('/', upload.array('medias', 4), postController.create);
postRouter.post('/:postUuid', upload.array('medias', 4), postController.create);

export { postRouter };
