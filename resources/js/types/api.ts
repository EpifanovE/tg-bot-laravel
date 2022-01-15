import {AxiosResponse} from "axios";

export interface Response<T = any> extends AxiosResponse<T> {}

export interface IApiProvider {
    getOne: <T>(resource: string, id: number) => Promise<void | Response<T>>,
    getMany: <T>(resource: string, data?: { filter?: { [p: string]: string | number | Array<any> | null }; perPage?: number; paginate?: number; page?: number; sort?: Array<string> }) => Promise<void | Response<T>>,
    update: <T>(resource: string, data: IUpdateRequest) => Promise<void | Response<T>>,
    create: <T>(resource: string, data?: ICreateRequest) => Promise<void | Response<T>>,
    delete: (resource: string, id: number) => Promise<IDeleteResponse>,
    deleteMany: (resource: string, ids: Array<number>) => Promise<IDeleteManyResponse>,
    refreshCsrf: () => void
    request: <T>(params: {
        method: "get" | "post" | "put" | "delete"
        endpoint?: string,
        url?: string,
        config?: {[key: string]: any}
    }) => Promise<Response<T>>
}

export interface IGetManyRequest {
    page?: number,
    perPage?: string,
    sort?: Array<string>,
    filter?: { [key: string]: string | number | Array<any> | null }
    paginate?: number
}

export interface ICreateRequest {
    data?: any
    files?: Array<File>
}

export interface IUpdateRequest {
    id: number,
    data: any
}

export interface IDeleteResponse {
    data?: {
        id?: number
    }
}

export interface IDeleteManyResponse {
    data?: any
}

export interface ILoginRequest {
    email: string,
    password: string
    remember_me?: boolean
}

export interface ILoginResponse {
    data?: any
}

export interface IProfileResponse {
    data?: {
        id?: number
        name?: string
        email?: string
        permissions?: Array<string>
        roles?: Array<number>
    }
}

export interface IResetPasswordResponse {
    data?: {
        message?: string
    } | undefined
}

export interface IGetManyResponse<T> {
    data?: Array<T>,
    meta?: {
        current_page?: number
        from?: number
        last_page?: number
        per_page?: number
        to?: number
        total?: number
    }
}
