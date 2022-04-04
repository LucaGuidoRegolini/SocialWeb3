import { Router } from 'express';

import { userRouter } from '@modules/users/routes/user.routes';
import { sessionRouter } from '@modules/users/routes/session.routes';
import { subscriptionRouter } from '@modules/users/routes/sub.routes';

import { postRouter } from '@modules/posts/routes/post.routes';
import { reactionRouter } from '@modules/posts/routes/reaction.routes';

const routes = Router();

routes.use('/users/session', sessionRouter);
routes.use('/users/subs', subscriptionRouter);
routes.use('/users', userRouter);

routes.use('/posts/reaction', reactionRouter);
routes.use('/posts', postRouter);

export { routes };
