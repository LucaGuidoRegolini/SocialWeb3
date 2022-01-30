export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  coverage?: string;
}
