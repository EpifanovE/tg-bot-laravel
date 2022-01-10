import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const TopMenu = (props) => {

    const {t} = useTranslation();

    return <ul className="c-header-nav d-md-down-none">
        <li className="c-header-nav-item px-3">
            <NavLink to="/" className="c-header-nav-link" activeClassName="c-active" exact>
                {t("dashboard")}
            </NavLink>
        </li>
    </ul>
};

export default TopMenu;
