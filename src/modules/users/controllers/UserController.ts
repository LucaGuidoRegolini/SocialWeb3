import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';
import { ListUserService } from '../services/ListUserService';
import { ShowUserService } from '../services/ShowUserService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page = 1,
      limit = 10,
      name,
      email,
      phone,
      is_active,
    } = request.query;

    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute({
      page: Number(page),
      limit: Number(limit),
      filters: {
        name: name ? String(name) : undefined,
        email: email ? String(email) : undefined,
        phone: phone ? String(phone) : undefined,
        is_active: is_active === undefined ? undefined : Boolean(is_active),
      },
    });

    return response.json(users);
  }

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
