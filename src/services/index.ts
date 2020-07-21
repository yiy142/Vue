import Axios, { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import store from '@/store'

export default class Service{
    static service: AxiosInstance
    static initialize(){
        let tempService = Axios.create({
            baseURL: `http://localhost:8081`,
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        tempService.interceptors.response.use(this.handleSuccess, this.handleError)
        this.service = tempService
    }

    static handleSuccess(response: AxiosResponse){
        return response;
    }
    static handleError(error:any){
        switch(error.response.status){
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
        return Promise.reject(error)
    }
    
    static async HTTP(url: string, type:AxiosRequestConfig["method"], callback:Function, payload?:Object){
        return this.service({
            method: type,
            url: url,
            data: payload
        }).then((response:AxiosResponse)=>{
            callback(response.status, response.data)
        })
    }
}