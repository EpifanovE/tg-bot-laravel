export interface IRoleItem {
    id: number
    key: string
    name: string
    built_in?: boolean
    created_at: string
    updated_at: string
}

export interface IRole {
    id?: number
    key: string
    name: string
    permissions: Array<string>
    built_in?: boolean
    created_at?: string
    updated_at?: string
}

export interface IPermission {
    group?: string
    code: string
}

export interface IPermissionsList {
    groups: Array<IPermissionsGroup>
    items: Array<IPermission>
}

export interface IPermissionsGroup {
    title: string,
    items: Array<IPermission>
}

