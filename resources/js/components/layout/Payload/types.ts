export type PayloadType = "text" | "textarea" | "number" | "checkbox";

export interface IPayloadInputProps {
    value: any
    onChange: (value: any) => void
}
