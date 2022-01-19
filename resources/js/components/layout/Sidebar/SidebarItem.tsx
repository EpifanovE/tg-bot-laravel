import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import Icon from "../Icon";

interface ISidebarItemProps {
    to: string
    label: any
    icon?: string
    iconColor?: string
}

const SidebarItem: FC<ISidebarItemProps> = ({to, label, icon, iconColor}) => {
    return <li className="c-sidebar-nav-item">
            <NavLink to={to} className={({isActive}) => {
                return `c-sidebar-nav-link${isActive ? " c-active" : ""}`
            }
            }>
                {
                    icon &&
                    <Icon name={icon} className={`c-sidebar-nav-icon${iconColor ? " text-" + iconColor : ""}`}/>
                }
                {label}
            </NavLink>
        </li>

};

export default SidebarItem;
