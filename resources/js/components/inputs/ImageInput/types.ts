export interface IFileResponse {
    id: number,
    content?: string | null,
    mime: string,
    ext: string,
}

export interface IFileToUpload {
    id: string
    file: File
}

export const ItemTypes = {
    CARD: 'card',
}

