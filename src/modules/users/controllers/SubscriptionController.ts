import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { AddSubscriptionService } from '../services/AddSubscriptionService';
import { RemoveSubcriptionService } from '../services/RemoveSubcriptionService';
import { ShowFollowingService } from '../services/ShowFollowingService';
import { ShowSubscriptionsService } from '../services/ShowSubscriptionsService';

export class SubscriptionController {
  public async showFollowing(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { uuid: userUuid } = request.user;
    const { page = 1, limit = 10 } = request.query;

    const showFollowing = container.resolve(ShowFollowingService);

    const followings = await showFollowing.execute({
      userUuid,
      page: Number(page),
      limit: Number(limit),
    });

    return response.json(followings);
  }

  public async showSubscribe(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { uuid: userUuid } = request.user;
    const { page = 1, limit = 10 } = request.query;

    const showSubscriptions = container.resolve(ShowSubscriptionsService);

    const subscriptions = await showSubscriptions.execute({
      userUuid,
      page: Number(page),
      limit: Number(limit),
    });

    return response.json(subscriptions);
  }

  public async add(request: Request, response: Response): Promise<Response> {
    const { followUuid } = request.body;
    const { uuid: userUuid } = request.user;

    const addSubscription = container.resolve(AddSubscriptionService);

    const session = await addSubscription.execute({
      userUuid,
      followUuid,
    });

    return response.json(session);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { uuid: userUuid } = request.user;
    const { uuid } = request.params;

    const removeSubcription = container.resolve(RemoveSubcriptionService);

    const session = await removeSubcription.execute({
      uuid,
      userUuid,
    });

    return response.json(session);
  }
}
