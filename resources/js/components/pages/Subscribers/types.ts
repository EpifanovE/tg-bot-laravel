export interface ISubscribersItem {
    id: number
    tid: number
    first_name?: string
    last_name?: string
    username: string
    language_code?: string
    blocked?: boolean
    created_at: string
    updated_at: string
}

export interface ISubscriber {
    id: number
    tid: number
    first_name?: string
    last_name?: string
    username: string
    language_code?: string
    blocked?: boolean
    created_at: string
    updated_at: string
    admin_id?: number | null
}
