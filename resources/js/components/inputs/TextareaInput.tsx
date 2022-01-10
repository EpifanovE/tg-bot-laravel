import React, {FC} from "react";
import {v4 as uuidv4} from "uuid";
import {IInputProps, IInputResettableProps} from "./types";
import InputGroup from "./InputGroup";

interface ITextInputProps extends IInputProps, IInputResettableProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
    placeholder?: string
    type?: string
    errors?: Array<string>
    touched?: boolean
    rows?: number
}

const TextareaInput: FC<ITextInputProps> = (props) => {

    const {
        value, onChange, placeholder, name, id, rows,
        args, invalidFeedback, className, text, touched,
        required, disabled, readOnly, size, label, onFocus, onBlur, errors
    } = props;

    const hasErrors = errors && errors.length;

    const classes = `form-group${className ? " " + className : ""}`;
    const inputClasses = `form-control${hasErrors ? " is-invalid" : ""}${touched && !hasErrors ? " is-valid" : "" }`;
    const normalizedId = id ? id : uuidv4();

    return <div className={classes}>
        {
            label &&
            <label htmlFor={normalizedId} className={`form-label${size ? " form-label-" + size : ""}`}>
                {label}
            </label>
        }
        <InputGroup
            size={size}
            invalidFeedback={invalidFeedback}
            resetDisabled={!value}
            text={text}
        >
            <textarea
                id={normalizedId}
                className={inputClasses}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                rows={rows || 5}
                {...args}
            />

        </InputGroup>
        {
            !!(errors && errors.length) &&
            errors.map((error, index) => (<div key={index} className="invalid-feedback d-block">
                {error}
            </div>))
        }
        {
            text &&
            <span className="help-block">
                {text}
            </span>
        }
    </div>
};

export default TextareaInput;
