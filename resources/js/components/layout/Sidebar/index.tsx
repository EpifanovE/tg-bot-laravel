import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from 'react-responsive';

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {hideSidebar, toggleMinimizedSidebar, toggleSidebarMenuItem} from "../../../store/actions/appActions";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {BREAKPOINTS, SCREEN_LG} from "../../../constants";
import SidebarItem from "./SidebarItem";
import DropdownItem from "./DropdownItem";
import {adminCan} from "../../../utils/auth";

const Sidebar = (props) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const {sidebarMinimized, sidebarClosed, openedMenuItems} = useSelector<IRootState, IAppState>(state => state.app);
    const isLgScreen = useMediaQuery({query: BREAKPOINTS[SCREEN_LG]});

    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => {
        if (!sidebarClosed && !isLgScreen) {
            dispatch(hideSidebar());
        }
    });

    const handleMinimizedClick = () => {
        dispatch(toggleMinimizedSidebar());
    };

    const handleDropdownClick = (key: string) => {
        dispatch(toggleSidebarMenuItem(key));
    };

    const classes = `c-sidebar c-sidebar-dark c-sidebar-fixed${sidebarMinimized ? " c-sidebar-minimized" : ""}${!sidebarClosed ? " c-sidebar-show" : ""}`;

    return <div className={classes} id="sidebar" ref={ref}>
        <div className="c-sidebar-brand d-lg-down-none">

        </div>
        <ul className="c-sidebar-nav">

            <SidebarItem to="/" label={t("dashboard")} icon="speedometer" />

            {
                adminCan("customers.manage") &&
                <SidebarItem
                    to="/customers"
                    label={t("customers")}
                    icon="people"
                />
            }

            {
                (adminCan("subscribers.manage") || adminCan("subscribers.view")) &&
                <SidebarItem
                    to="/subscribers"
                    label={t("subscribers")}
                    icon="people"
                />
            }

            {
                (adminCan("messages.manage") || adminCan("messages.view")) &&
                <SidebarItem
                    to="/messages"
                    label={t("messagesList")}
                    icon="envelope-closed"
                />
            }

            {
                (adminCan("analytics.view")) &&
                <DropdownItem
                    label={t("analytics")}
                    icon="chart"
                    isOpen={openedMenuItems.includes("analytics")}
                    code="analytics"
                    onClick={handleDropdownClick}
                >
                    <SidebarItem to="/subscribers-analytics" label={t("newSubscribers")} icon="chart" />
                    <SidebarItem to="/usages-analytics" label={t("uniqueUsages")} icon="chart" />
                    <SidebarItem to="/commands-analytics" label={t("commands")} icon="chart" />
                    <SidebarItem to="/unhandled-analytics" label={t("unhandled")} icon="chart" />
                </DropdownItem>
            }

            {
                (adminCan("admins.manage") || adminCan("roles.manage") || adminCan("roles.view") || adminCan("admins.view")) &&
                <DropdownItem
                    label={t("access")}
                    icon="lock-locked"
                    isOpen={openedMenuItems.includes("admins")}
                    code="admins"
                    onClick={handleDropdownClick}
                >
                    {
                        (adminCan("admins.manage") || adminCan("admins.view")) &&
                        <SidebarItem to="/admins" label={t("admins")} icon="people" />
                    }
                    {
                        (adminCan("roles.manage") || adminCan("roles.view")) &&
                        <SidebarItem to="/roles" label={t("roles")} icon="lock-locked" />
                    }
                </DropdownItem>
            }

            {
                (adminCan("settings.manage") || adminCan("settings.view")) &&
                <DropdownItem
                    label={t("settings")}
                    icon="cog"
                    isOpen={openedMenuItems.includes("settings")}
                    code="settings"
                    onClick={handleDropdownClick}
                >
                    <SidebarItem to="/settings/analytics" label={t("analytics")} icon="cog" />
                </DropdownItem>
            }

        </ul>
        <button className="c-sidebar-minimizer sidebar-toggler" type="button" onClick={handleMinimizedClick} />
    </div>
};

export default Sidebar;
