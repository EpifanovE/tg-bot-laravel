import React, {FC, ReactElement, useEffect, useRef, useState} from "react";
import {IHasClassName} from "../../../types/app";
import Choice from "./Choice";
import Icon from "../../layout/Icon";
import useOutsideClick from "../../../hooks/useOutsideClick";

export interface IChoice {
    value: string | number
    label: string
}

interface ICustomSelectProps extends IHasClassName {
    value: Array<string | number>
    choices: Array<IChoice>
    onChange: (value: Array<string | number>) => void
    label?: string
    placeholder?: string
    multiple?: boolean
    valueField?: string
    labelField?: string
    labelRender?: (choice: any) => ReactElement
    resettable?: boolean
    disabled?: boolean
    required?: boolean
}

const CustomSelect: FC<ICustomSelectProps> = (props) => {

    const {className, choices, value, onChange, placeholder, label, multiple, valueField, labelField, resettable,
        disabled, labelRender, required} = props;

    const [active, setActive] = useState(false);

    const rootClasses = `CustomSelect${className ? " " + className : ""}${disabled ? " CustomSelect_disabled" : ""}${required ? " CustomSelect_required" : ""}`;
    const inputClasses = `CustomSelect__Input${resettable ? " CustomSelect__Input_reset" : ""}`;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!multiple) {
            setActive(false);
        }
    }, [value]);

    useOutsideClick(ref, () => {
        if (active) {
            setActive(false)
        }
    });

    const handleSelect = (key: string) => {

        if (multiple) {
            if (!value.includes(key)) {
                onChange([...value, key]);
            } else {
                onChange(value.filter(item => item !== key))
            }
        } else {
            onChange([key]);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) return;
        setActive(!active);
    };

    const handleResetClick = () => {
        if (!resettable || disabled) return;

        onChange([]);
    };

    const getValue = (choice: IChoice) => {
        return valueField ? choice[valueField] : choice.value;
    };

    const getLabel = (choice: IChoice) => {
        if (labelRender) {
            return labelRender(choice);
        }
        return labelField ? choice[labelField] : choice.label;
    };

    return <div className={rootClasses}>
        {
            label &&
            <label className="CustomSelect__Label" onClick={handleClick}>
                {label}
            </label>
        }
        <div className="d-flex">
        <div className={inputClasses} onClick={handleClick}>
            {
                !value.length && placeholder
            }
            {
                !!choices.length && value.map(item => {
                    const choice = choices.filter(choice => getValue(choice) === item)[0];
                    return <span className="CustomSelect__Item" key={item}>
                        <span>{getLabel(choice)}</span>
                    </span>
                })
            }
            <span className="CustomSelect__Arrow">
                <Icon name="caret-bottom" />
            </span>
            </div>
            {
                resettable &&
                <div className="CustomSelect__Append" onClick={handleResetClick}>
                    <button className="CustomSelect__Reset" type="button">✕</button>
                </div>
            }
        </div>
        {
            active &&
            <div className="CustomSelect__List" ref={ref}>
                {
                    choices.map(choice => {
                        return <Choice
                            key={getValue(choice)}
                            value={getValue(choice)}
                            label={getLabel(choice)}
                            onClick={handleSelect}
                            selected={value.includes(getValue(choice))}
                        />
                    })
                }
            </div>
        }
    </div>
};

export default CustomSelect;
