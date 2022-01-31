import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';
import { ListUserService } from '../services/ListUserService';
import { ShowUserService } from '../services/ShowUserService';

export class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({
      uuid,
    });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;

    const { avatar: avatarFile, coverage: coverageFile } = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const avatar = avatarFile ? avatarFile[0].filename : undefined;
    const coverage = coverageFile ? coverageFile[0].filename : undefined;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      phone,
      avatar,
      coverage,
    });

    return response.json(user);
  }
}
