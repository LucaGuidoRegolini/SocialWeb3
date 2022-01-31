import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateSessionService } from '../services/CreateSessionService';
import { RefreshSessionService } from '../services/RefreshSessionService';
import { DeleteSessionService } from '../services/DeleteSessionService';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const session = await createSession.execute({
      email,
      password,
    });

    return response.json(session);
  }

  public async refresh(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshSession = container.resolve(RefreshSessionService);

    const session = await refreshSession.execute({
      refreshToken: refresh_token,
    });

    return response.json(session);
  }

  public async logout(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const deleteSession = container.resolve(DeleteSessionService);

    await deleteSession.execute({
      refreshToken: refresh_token,
    });

    return response.status(204).send();
  }
}
