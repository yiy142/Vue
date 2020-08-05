import Axios, { AxiosResponse, AxiosInstance } from 'axios';

export default class BaseServiceClassService {
  // Common Service
  protected service: AxiosInstance;
  constructor() {
    this.service = Axios.create({
      baseURL: 'http://localhost:8081',
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
    this.service.interceptors.response.use(this.onSuccess, this.onError);
  }

  onSuccess(response: AxiosResponse): any {
    return response;
  }

  onError(error: any): any {
    // collect some log
    switch (error.response?.status) {
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
}
