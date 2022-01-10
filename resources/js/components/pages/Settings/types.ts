import {PayloadType} from "../../layout/Payload/types";

export interface ISettingItem {
    id: number
    code: string
    name: string
    type: PayloadType
    created_at: string
    updated_at: string
}

export interface ISetting {
    id?: number
    code: string
    name: string
    type: PayloadType
    payload: any
    built_in?: boolean
    created_at?: string
    updated_at?: string
}
