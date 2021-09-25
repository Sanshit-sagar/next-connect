import { useState } from 'react' 
import { useUserSession } from './useUserSession'

interface ApiResponse {
    count: number; 
    next: string | undefined;
    previous: string | undefined;
    result: 
}

export enum ServiceStateEnum {
    INIT ='init',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}

export interface ServiceInit { 
    status: ServiceStateEnum.INIT; 
}
export interface ServiceLoading { 
    status: ServiceStateEnum.LOADING; 
}
export interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
}
export interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
}

export type Service<T> =
        | ServiceInit
        | ServiceLoading
        | ServiceLoaded<T>
        | ServiceError;


const useUrchinMutator = () => {
    const { primaryEmailAddress } = useUserSession()
    let [service, setService] = useState<Service<ApiResponse>>({ 
        status: ServiceStateEnum.INIT 
    })

    const publishNewUrchin = (key: UrchinCategoryType, value: IUrchin) => {
        setService({ status: ServiceStateEnum.LOADING })

        let postHeaders =  new Headers()
        postHeaders.append('Content-Type', 'application/json; charset=utf-8')

        return new Promise((resolve, reject) => {
            fetch(`/api/urchins/user/${primaryEmailAddress}/${key}/${value}`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify({
                    "category": key,
                    "urchin": {...value},
                })
            })
            .then((response) => response.json())
            .then((result) => {
                setService({ 
                    status: ServiceStateEnum.LOADED, 
                    payload: result 
                })
                resolve(result)
            })
            .catch((error) => {
                setService({ 
                    status: ServiceStateEnum.ERROR,
                    error 
                });
                reject(error)
            });
        })
    }

    return {
        service,
        publishNewUrchin
    }
}