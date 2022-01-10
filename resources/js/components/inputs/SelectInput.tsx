import React, {FC, useEffect} from "react";
import {ISelectInputProps} from "./types";
import {v4 as uuidv4} from "uuid";
import InputGroup from "./InputGroup";

const SelectInput: FC<ISelectInputProps> = (props) => {

    const {
        value, onChange, choices, className, name, id, label, multiple, resettable, canBeEmpty, emptyText, text,
        onResetClick, append, prepend, invalidFeedback, size, isInvalid, required, disabled, args
    } = props;

    const EMPTY_OPTION = "emptyOption";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === EMPTY_OPTION) {
            onChange([]);
            return;
        }
        if (multiple) {
            onChange(Array.from(e.target.selectedOptions, option => option.value));
        } else {
            onChange([e.target.value]);
        }
    };

    const normalizeValue = () => {
        if (value.length === 0) {
            return EMPTY_OPTION;
        }

        if (multiple) {
            return value
        }

        return value[0];
    };

    const choicesEls = Object.keys(choices).map(key => <option value={key} key={key}>{choices[key]}</option>);

    if (canBeEmpty) {
        choicesEls.unshift(<option value={EMPTY_OPTION} key={EMPTY_OPTION}>{emptyText}</option>)
    }

    const normalizedId = id ? id : uuidv4();
    const classes = `form-group${className ? " " + className : ""}`;
    const inputClasses = `custom-select${isInvalid ? " is-invalid" : ""}`;

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
            resetDisabled={!value.length}
            text={text}
        >
            <select
                className={inputClasses}
                name={name}
                id={normalizedId}
                onChange={handleChange}
                value={normalizeValue()}
                multiple={multiple}
                required={required}
                disabled={disabled}
                {...args}
            >
                {choicesEls}
            </select>
        </InputGroup>
        {
            text &&
            <small className="form-text text-muted">
                {text}
            </small>
        }
    </div>
};

export default SelectInput;
