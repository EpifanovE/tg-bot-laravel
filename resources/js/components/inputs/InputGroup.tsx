import React, {FC} from "react";
import {IInputGroupProps} from "./types";

const InputGroup: FC<IInputGroupProps> = ({className, size, children, prepend, append, resettable,
                      invalidFeedback, resetDisabled, onResetClick, text}) => {
    const groupClasses = `input-group${className ? " " + className : ""}${size ? " input-group-" + size : ""}`;

    return <div className={groupClasses}>
        {
            prepend &&
            <div className="input-group-prepend">
                {prepend}
            </div>
        }
        {children}
        {
            append &&
            <div className="input-group-append">
                {append}
            </div>
        }
        {
            resettable &&
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={onResetClick}
                    disabled={resetDisabled}
                >
                    &#x2715;
                </button>
            </div>
        }
        {
            invalidFeedback &&
            <div className="invalid-feedback">{invalidFeedback}</div>
        }
    </div>
};

export default InputGroup;
