import axios  from 'axios';
import * as authHelper from './app/modules/auth/core/AuthHelpers';
import {notification} from 'antd'
import React, {useState} from "react";
import qs from "qs";

const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/api",
    headers: {
        'Content-type': 'application/json'
    }
})

const createHeaderAuth = () : {Authorization: string}  => {
    const token = authHelper.getAuth();

    return { Authorization: `${token?.api_token}` };
}

HTTP.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if(error.response.status === 420){
            return Promise.reject(error.response.data)
        }

        // ленывый вывод ошибок в модалке
        if(error.response.status === 422){
            console.error(error.response.data);
            let message = error.response.data.message
            if(typeof error.response.data.message !== 'string'){
                message = React.createElement('pre',null,JSON.stringify(error.response.data.message,null,'  '));
            }

           /* class message extends Component {
                render() {
                    return null;
                }
            }*/

            notification.error({
                message: `Ошибка`,
                description: message,
                placement: "top",
            })

        }

        return Promise.reject(error.response.data)
    }
);

export const API_GET = <T>(method: string, data?: object) => {

    const headerAuth = createHeaderAuth()

    if(data){
        const params = qs.stringify(data)
        method = method + "?" + params
    }

    return HTTP.get<any,T>(
        method,
        {
            headers: {...headerAuth}
        }
    );
}

export const API_POST = <T>(method: string, data?: object) => {
    const headerAuth = createHeaderAuth();

    return HTTP.post<any, T> (
        method,
        data,
        {
            headers: {...headerAuth}
        }
    );
}


export const useApiPost = <T>(method: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<T>()
    const trigger = (params?: object) => {
        setIsLoading(true)
        setIsError(false)
        setError('')
        return new Promise<T>((resolve,reject) => {
            API_POST<T>(method, params)
                .then( r => {
                    setData(r)
                    resolve(r)
                })
                .catch(e => {
                    setError(e.message)
                    setIsError(true)
                    reject(e)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        })
    }
    return [trigger, {isLoading, isError, error, data}] as const
}

export const useApiGet = <T>(method: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [data, setData] = useState<T>()
    const trigger = (params?: object) => {
        setIsLoading(true)
        setIsError(false)
        setError('')
        return new Promise<T>((resolve,reject) => {
            API_GET<T>(method, params)
                .then( r => {
                    setData(r)
                    resolve(r)
                })
                .catch(e => {
                    setError(e.message)
                    setIsError(true)
                    reject(e)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        })
    }
    return [trigger, {isLoading, isError, error, data}] as const
}


