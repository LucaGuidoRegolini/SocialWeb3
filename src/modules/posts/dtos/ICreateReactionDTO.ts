import { reactionEnum } from 'enum/reactionEnum';

interface ICreateReactionDto {
  postId: number;
  reaction: reactionEnum;
  userId: number;
}

export { ICreateReactionDto };
