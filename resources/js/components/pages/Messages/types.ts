import {Moment} from "moment";

export interface IMessageItem {
    id: number
    name: string
    status: string
    run_at?: string | null
    created_at: string
    updated_at: string
}

export interface IMessage {
    id?: number
    name: string
    body: string
    status: Status
    parse_mode: ParseMode
    attachments_ids?: Array<number>
    run_at?: Moment | string | null
    published_at?: string | null
    created_at?: string
    updated_at?: string
}

export enum SaveMode {
    Draft = "draft",
    Publish = "publish",
    Planned = "planned",
    Test = "test",
}

export enum ParseMode {
    HTML = "html",
    MD = "md",
}

export enum Status {
    Draft = "draft",
    Publish = "publish",
    Planned = "planned",
}
