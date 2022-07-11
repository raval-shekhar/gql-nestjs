import { IUserEntity } from './user'

export interface IPostEntity {
  title: string;
  image: string;
  description: string;
  user: IUserEntity
}

