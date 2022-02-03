import { Router } from 'express';
import { ensureAuthenticated } from '@shared/server/middlewares/ensureAuthenticated';

import { SubscriptionController } from '../controllers/SubscriptionController';
import { create, pages, uuid } from './validations/sub.validation';

const subsController = new SubscriptionController();

const subscriptionRouter = Router();

subscriptionRouter.use(ensureAuthenticated);

subscriptionRouter.post('/', create, subsController.add);
subscriptionRouter.get('/following', pages, subsController.showFollowing);
subscriptionRouter.get('/subscriptions', pages, subsController.showSubscribe);
subscriptionRouter.delete('/:uuid', uuid, subsController.remove);

export { subscriptionRouter };
