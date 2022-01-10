import React, {FC} from "react";
import {v4 as uuidv4} from "uuid";
import {IInputProps, IInputResettableProps} from "./types";
import InputGroup from "./InputGroup";

interface ITextInputProps extends IInputProps, IInputResettableProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    placeholder?: string
    type?: string
    errors?: Array<string>
    touched?: boolean
}

const TextInput: FC<ITextInputProps> = (props) => {

    const {
        value, onChange, placeholder, name, id,
        type, args, invalidFeedback, className, text, touched,
        resettable, prepend, append, required, disabled, readOnly, size, onResetClick, label, onFocus, onBlur, errors
    } = props;

    const hasErrors = errors && errors.length;

    const classes = `form-group${className ? " " + className : ""}${required ? " required" : ""}`;
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
            append={append}
            prepend={prepend}
            resettable={resettable}
            onResetClick={onResetClick}
            invalidFeedback={invalidFeedback}
            resetDisabled={!value}
            text={text}
        >
            <input
                id={normalizedId}
                className={inputClasses}
                type={type ? type : "text"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
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

export default TextInput;
