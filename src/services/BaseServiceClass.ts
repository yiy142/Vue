import Axios, { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export default class BaseServiceClassService {
  // Common Service
  protected static service: AxiosInstance;
  static initialize(): void {
    this.service = Axios.create({
      baseURL: 'http://localhost:8081',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    this.service.interceptors.response.use(this.onSuccess, this.onError);
  }

  static onSuccess(response: AxiosResponse): any {
    return response;
  }

  static onError(error: any): any {
    switch (error.response.status) {
      case 401:
        // redirect to home page
        break;
      case 404:
        //redirect to /404
        break;
      default:
        //redirect to /500
        break;
    }
    return Promise.reject(error);
  }

  static GET(url: string): Promise<any> {
    return this.service.get(url);
  }
  static DELETE(url: string): Promise<any> {
    return this.service.delete(url);
  }
  static POST(url: string, payload: Record<string, unknown>): Promise<any> {
    return this.service.post(url, payload);
  }
  static PUT(url: string, payload: Record<string, unknown>): Promise<any> {
    return this.service.put(url, payload);
  }
}
