import React, {FC, useState} from "react";
import Icon from "../Icon";

interface IDropdownItemProps {
    label: any
    icon?: string
    iconColor?: string
    isOpen: boolean
    code: string
    onClick: (code: string) => void
}

const DropdownItem: FC<IDropdownItemProps> = ({label, code, icon, iconColor, isOpen, onClick, children}) => {

    const rootClasses = `c-sidebar-nav-item c-sidebar-nav-dropdown${isOpen ? " c-show" : ""}`;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick(code);
    };

    return (
        <li className={rootClasses}>
            <a
                className="c-sidebar-nav-link c-sidebar-nav-dropdown-toggle"
                href="#"
                onClick={handleClick}
            >
                {icon && <Icon name={icon} className={`c-sidebar-nav-icon${iconColor ? " text-" + iconColor : ""}`}/>}
                {label}
            </a>
            <ul className="c-sidebar-nav-dropdown-items">
                {children}
            </ul>
        </li>
    )
};

export default DropdownItem;
