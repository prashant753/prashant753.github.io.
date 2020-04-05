import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IApiClient } from './interfaces';
import { authorizationRequestInterceptor, expiredAuthorizationTokenResponseInterceptor } from './interceptors';
import { errorHandler, successHandler } from './responseHandlers';
import { BASE_URL } from './constants';

const getClient = (baseUrl: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  // Add Request Interceptor to add Authorization header
  axiosInstance.interceptors.request.use(authorizationRequestInterceptor);

  // Add Response Interceptor for Authorization token expiry
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => Promise.resolve(response),
    expiredAuthorizationTokenResponseInterceptor);

  return axiosInstance;
};

export default class ApiClient implements IApiClient {
  private baseUrl: string;
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = getClient(baseUrl);
    this.baseUrl = baseUrl;
  }

  public request = (config: any) => {
    return this.client.request(config)
      .then((response) => Promise.resolve(successHandler(response)))
      .catch((error) => Promise.reject(errorHandler(error)));
  }

  public get = (url: string, params = {}) => {
    return this.httpMethod(url, params, 'GET');
  }

  public post = (url: string, data = {}, params = {}) => {
    return this.httpMethod(url, params, 'POST', data);
  }

  public put = (url: string, data = {}, params = {}) => {
    return this.httpMethod(url, params, 'PUT', data);
  }

  public patch = (url: string, data = {}, params = {}) => {
    return this.httpMethod(url, params, 'PATCH', data);
  }

  public delete = (url: string, params = {}) => {
    return this.httpMethod(url, params, 'DELETE');
  }

  public httpMethod = (url: string, params = {}, method: string, data?: any) => {
    return data ? this.request({
      method: `${method}`,
      url,
      data,
      params,
    }) : this.request({
      method: `${method}`,
      url,
      params,
    });
  }
}

const apiClient = new ApiClient(BASE_URL);

export { apiClient as ApiClient };
