import React, {FC} from "react";
import { v4 as uuidv4 } from 'uuid';

interface ICheckboxProps {
    name?: string
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    id?: string
    className?: string
    value?: string
    isInvalid?: boolean
    invalidFeedback?: string
    required?: boolean
}

const Checkbox: FC<ICheckboxProps> = ({name, checked, onChange, label, id, value, className, isInvalid, invalidFeedback, required}) => {

    const normalizeId = id ? id : uuidv4();
    const classes = `form-check${className ? " " + className : ""}`;
    const inputClasses = `form-check-input${isInvalid ? " is-invalid" : ""}`;

    return <div className={classes}>
        <input
            name={name}
            className={inputClasses}
            type="checkbox"
            value={value}
            id={normalizeId}
            checked={checked}
            onChange={onChange}
            required={required}
        />
        {
            label &&
            <label className="form-check-label" htmlFor={normalizeId}>{label}</label>
        }
        {
            invalidFeedback &&
            <div className="invalid-feedback">{invalidFeedback}</div>
        }
    </div>
};

export default Checkbox;
