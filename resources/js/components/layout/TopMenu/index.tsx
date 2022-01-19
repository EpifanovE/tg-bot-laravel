import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const TopMenu = (props) => {

    const {t} = useTranslation();

    return <ul className="c-header-nav d-md-down-none">
        <li className="c-header-nav-item px-3">
            <NavLink to="/"  className={({isActive}) => {
                return `c-header-nav-link${isActive ? " c-active" : ""}`
            }}>
                {t("dashboard")}
            </NavLink>
        </li>
    </ul>
};

export default TopMenu;
