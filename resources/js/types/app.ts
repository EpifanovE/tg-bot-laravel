import {ReactNode} from "react";

export interface IBreadcrumb {
    url?: string,
    label: string
}

export interface IAlert {
    id: string
    message: string
    mode: string
}

declare global {
    interface Window {
        axios: any,
        Echo: any
    }
}

export enum GridSize {
    SM ="sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
    XXL = "XXL"
}

export type Size = "sm" | "lg";

export interface ITabsProps {
    tabs: Array<ITab>
}

export interface ITabProps {
    id: string
    isActive: boolean
    label: string
    badge?: string
    badgeMode?: string
    onClick: (key: string) => void
}

export interface ITabPaneProps {
    isActive: boolean
}

export interface ITab {
    id: string
    label: string
    component: ReactNode
    badge?: string
    badgeMode?: string
}

export interface ILocalStorageState {
    sidebarMinimized?: boolean
    sidebarClosed?: boolean
    locale?: string
}

export interface IHasClassName {
    className?: string
}

export interface IHasParentResource {
    resource?: {
        id: number
        type: string
    }
}
