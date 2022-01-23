import React, {FC, useRef, useState} from "react";
import {InputChoices} from "../../inputs/types";
import {Size} from "../../../types/app";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {closeUserPanelMenu} from "../../../store/actions/appActions";

export interface IDropdownMenuProps {
    choices: InputChoices
    label: string
    value: string
    onChange: (value: string) => void
    mode?: string
    size?: Size
    className?: string
    dropup?: boolean
    disabled?: boolean
}

const DropdownMenu : FC<IDropdownMenuProps> = (props) => {

    const {choices, label, value, onChange, mode, size, dropup, disabled} = props;

    const [open, setOpen] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => {
        if (open) {
            setOpen(false);
        }
    });

    const handleClick = () => {
        setOpen(!open);
    };

    const handleItemClick = (value: string) => {
        onChange(value);
        setOpen(false);
    };

    const els = Object.keys(choices).map(key => <a
        key={key}
        className="dropdown-item"
        href="#"
        onClick={e => {e.preventDefault();handleItemClick(key)}}
    >{choices[key]}</a>);

    return <>
        <button
            className={`btn${mode ? " btn-" + mode : ""}${size ? " btn-" + size : ""} dropdown-toggle`}
            type="button"
            onClick={handleClick}
            disabled={disabled}
        >
            {value ? value : label}
        </button>
        {
            open &&
            <div className={`dropdown-menu${open ? " show" : ""}`} ref={ref} >
                {els}
            </div>
        }
    </>
};

export default DropdownMenu;
