import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { AddReactionService } from '../services/AddReactionService';

export class ReactionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { postUuid } = req.params;
    const { uuid: userUuid } = req.user;
    const { reaction } = req.body;

    const addReaction = container.resolve(AddReactionService);

    const newReaction = await addReaction.execute({
      postUuid,
      userUuid,
      reaction,
    });

    return res.json(newReaction);
  }
}
