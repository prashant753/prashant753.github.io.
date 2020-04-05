import Axios, { AxiosRequestConfig } from 'axios';
import { LocalStorage } from '../utils/LocalStorage';
import {
  ANONYMOUS_ROUTES,
  AUTH_TOKEN_EXPIRED_MESSAGE,
  HTTP_STATUS_CODES,
  AUTH_TOKEN_STORAGE_KEY,
} from './constants';
import { UserRepository } from '../api/repositories/UserRepository';

export const authorizationRequestInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  if (config.url && !config.url.includes(ANONYMOUS_ROUTES[0]) && !config.url.includes(ANONYMOUS_ROUTES[1])) {
    const token: any = await LocalStorage.get(AUTH_TOKEN_STORAGE_KEY);

    config.headers = {
      ...config.headers,
      Authorization: `Token ${token}`,
    };
  }
  return config;
};

export const expiredAuthorizationTokenResponseInterceptor = async (error: any): Promise<any> => {
  const originalRequest = error.config;
  if ('Network Error' === error.message) {
    return Promise.reject({ error: { message: 'Network Error' } });
  }

  if ('ECONNABORTED' === error.code) {
    // timeout
    return Promise.reject({ error: { message: 'Network Error' } });
  }

  if (isAuthorizationTokenExpiredError(error) && !originalRequest._retry) {
    originalRequest._retry = true;
    const newToken = await UserRepository.refreshToken();
    await LocalStorage.set(AUTH_TOKEN_STORAGE_KEY, newToken.token.authToken);
    originalRequest.headers.Authorization = `Token ${newToken.token.authToken}`;
    const resp = await Axios(originalRequest);
    if (resp.data) {
      return Promise.resolve(resp);
    } else {
      return Promise.reject(resp);
    }
  }
  return Promise.reject(error);
};

const isAuthorizationTokenExpiredError = (error: any): boolean => {
  return (error.response &&
    error.response.data &&
    AUTH_TOKEN_EXPIRED_MESSAGE === error.response.data.data.message);
};
