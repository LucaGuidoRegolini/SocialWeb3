import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreatePostService } from '../services/CreatePostService';

export class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { postUuid } = request.params;
    const { uuid: userUuid } = request.user;
    const { content } = request.body;

    const mediasFile = request.files as Express.Multer.File[];

    const medias = mediasFile
      ? mediasFile.map(image => {
          return {
            name: image.originalname,
            path: image.filename,
          };
        })
      : [];

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      content,
      userUuid,
      postUuid: postUuid || undefined,
      medias,
    });

    return response.json(post);
  }
}
