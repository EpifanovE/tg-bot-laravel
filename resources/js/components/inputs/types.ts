import React, {ReactNode} from "react";
import {Size} from "../../types/app";

export interface IInputProps {
    id?: string,
    name?: string,
    args?: {
        min?: number
        step?: number
    }
    isInvalid?: boolean
    invalidFeedback?: string
    text?: string
    append?: ReactNode
    prepend?: ReactNode
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    size?: Size
    className?: string
    label?: string
}

export interface IInputResettableProps {
    resettable?: boolean
    onResetClick?: () => void
}

export interface InputChoices {[key: string] : string}

export interface IInputChoicesProps {
    choices: InputChoices
    multiple?: boolean
}

export interface IInputGroupProps {
    className?: string
    size?: string
    append?: ReactNode
    prepend?: ReactNode
    resettable?: boolean
    onResetClick?: () => void
    invalidFeedback?: string
    resetDisabled?: boolean
    text?: string
}

export interface ISelectInputProps extends IInputProps, IInputChoicesProps, IInputResettableProps {
    value: Array<string>
    onChange: (value: Array<string>) => void
    canBeEmpty?: boolean
    emptyText?: string
}
