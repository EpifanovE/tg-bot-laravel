import React, {FC, useRef} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {useTranslation} from "react-i18next";
import {logoutRequest} from "../../../store/actions/adminActions";
import Spinner from "../Ui/Spinner";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {closeUserPanelMenu} from "../../../store/actions/appActions";

const Menu = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {userPanelMenuOpen, logoutLoading} = useSelector<IRootState, IAppState>(state => state.app);

    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => {
        if (userPanelMenuOpen) {
            dispatch(closeUserPanelMenu());
        }
    });

    const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(closeUserPanelMenu());
        dispatch(logoutRequest());
    };

    const classes = `dropdown-menu dropdown-menu-right pt-0${userPanelMenuOpen ? " show" : ""}`;

    return <div className={classes} ref={ref}>
        <div className="dropdown-header bg-light py-2">
            <strong>{t("account")}</strong>
        </div>
        <NavLink to="/profile" className="dropdown-item" onClick={() => {dispatch(closeUserPanelMenu());}}>
            <i className="c-icon mr-2 cil-settings"/>
            {t("settings")}
        </NavLink>
        <a className="dropdown-item" href="#" onClick={handleLogoutClick}>
            <i className="c-icon mr-2 cil-account-logout"/>
            {t("logout")}
            {
                logoutLoading &&
                    <Spinner className="ml-2" size="sm"/>
            }
        </a>
    </div>
};

export default Menu;
