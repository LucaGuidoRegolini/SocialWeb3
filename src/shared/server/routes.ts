import { Router } from 'express';

import { userRouter } from '@modules/users/routes/user.routes';
import { sessionRouter } from '@modules/users/routes/session.routes';

const routes = Router();

routes.use('/users/session', sessionRouter);
routes.use('/users', userRouter);

export { routes };
