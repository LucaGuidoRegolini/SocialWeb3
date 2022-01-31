import { Router } from 'express';

import { SessionController } from '../controllers/SessionController';
import { login, refresh } from './validations/session.validation';

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post('/', login, sessionController.create);
sessionRouter.put('/', refresh, sessionController.refresh);
sessionRouter.delete('/', refresh, sessionController.logout);

export { sessionRouter };
