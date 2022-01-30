export interface ISessionDto<T> {
  result: T;
  access_token: string;
  refresh_token: string;
}
