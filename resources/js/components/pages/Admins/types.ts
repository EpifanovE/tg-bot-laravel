import {IRoleItem} from "../Roles/types";

export interface IAdminItem {
    id: number
    name: string
    email: string
    status: string
    created_at: string
    updated_at: string
}

export interface IAdmin {
    id?: number
    name: string
    email: string
    status: string
    roles: Array<number>
    password?: string | null
    password_confirmation?: string | null
    created_at?: string
    updated_at?: string
}

