import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateSessionService } from '../services/CreateSessionService';

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
}
