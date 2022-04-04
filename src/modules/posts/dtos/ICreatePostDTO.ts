interface ICreatePostDto {
  content: string;
  userId: number;
  commentId?: number;
}

export { ICreatePostDto };
