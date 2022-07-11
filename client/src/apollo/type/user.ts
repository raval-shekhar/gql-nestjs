export interface IUserEntity {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  token: string;
  name: string;
  email: string;
}

export interface IAuthState {
  user: IUserResponse | null,
  loading: boolean
}

