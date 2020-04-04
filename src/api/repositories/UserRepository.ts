import { IApiClient } from '../../network/interfaces';
import { ApiClient } from '../../network/client';
import { IUserRepository } from './interfaces';
import { ILoginModel, IUserModel } from '../models/User';
import { LocalStorage } from '../../utils/LocalStorage';
import { REFRESH_TOKEN_STORAGE_KEY } from '../../network/constants';

const ENDPOINTS = {
  login: () => `/api/v1/signin`,
  refreshToken: (refreshTOken: string) => `/api/v1/token?refresh_token=${refreshTOken}`,
};

class UserRepository implements IUserRepository {
  private apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  public login = async (user: ILoginModel): Promise<IUserModel> => {
    try {
      const response = await this.apiClient.post(ENDPOINTS.login(), user);
      return response.user as IUserModel;
    } catch (error) {
      return error;
    }
  }

  public refreshToken = async (): Promise<any> => {
    try {
      const refreshToken: any = await LocalStorage.get(REFRESH_TOKEN_STORAGE_KEY);
      return await this.apiClient.get(ENDPOINTS.refreshToken(refreshToken));
    } catch (error) {
      return error;
    }
  }
}

const userRepository = new UserRepository(ApiClient);
export { userRepository as UserRepository };
