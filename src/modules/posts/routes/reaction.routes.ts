import { Router } from 'express';

import { ReactionController } from '../controllers/ReactionController';

import { ensureAuthenticated } from '@shared/server/middlewares/ensureAuthenticated';

const reactionController = new ReactionController();

const reactionRouter = Router();

reactionRouter.use(ensureAuthenticated);

reactionRouter.post('/:postUuid', reactionController.create);

export { reactionRouter };
