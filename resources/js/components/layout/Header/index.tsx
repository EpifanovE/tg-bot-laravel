import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import TopMenu from "../TopMenu";
import UserMenu from "../UserMenu";
import {useDispatch} from "react-redux";
import {toggleSidebar} from "../../../store/actions/appActions";

const Header = (props) => {
    const dispatch = useDispatch();

    const handelSidebarToggleClick = () => {
        dispatch(toggleSidebar());
    };

    return <header className="c-header c-header-light c-header-fixed c-header-with-subheader">
        <button
            className="c-header-toggler c-class-toggler d-lg-none mfe-auto"
            type="button"
            onClick={handelSidebarToggleClick}
        >
            <i className="c-icon c-icon-lg cil-hamburger-menu" />
        </button>

        <a className="c-header-brand d-lg-none" href="#">
            LOGO
        </a>

        <button
            className="c-header-toggler c-class-toggler mfs-3 d-md-down-none"
            type="button"
            onClick={handelSidebarToggleClick}
        >
            <i className="c-icon c-icon-2xl c-icon-lg cil-hamburger-menu" />
        </button>
        <TopMenu />
        <UserMenu />
        <Breadcrumbs />
    </header>;
};

export default Header;
