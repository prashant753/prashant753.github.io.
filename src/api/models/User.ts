export interface ILoginModel {
  user: {
    email: string;
    password: string;
  };
}

export interface IRole {
  id: number;
  name: string;
}

export interface IUserModel {
  id: number;
  isVerified: boolean;
  token: {
    authToken: string;
    refreshToken: string;
  };
  role: IRole[];
  email: string;
}
