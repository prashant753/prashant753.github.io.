export interface IApiClient {
  request(config: any): any;
  get(url: string, params?: {}): any;
  post(url: string, data?: {}, params?: {}): any;
  put(url: string, data?: {}, params?: {}): any;
  patch(url: string, data?: {}, params?: {}): any;
  delete(url: string, params?: {}): any;
}
