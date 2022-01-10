import React from "react";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import ResetPasswordRequest from "./components/pages/ResetPasswordRequest";
import ResetPasswordReset from "./components/pages/ResetPasswordReset";
import {Profile} from "./components/pages/Profile";
import Admins from "./components/pages/Admins/Admins";
import Admin from "./components/pages/Admins/Admin";
import Roles from "./components/pages/Roles/Roles";
import Role from "./components/pages/Roles/Role";
import Setting from "./components/pages/Settings/Setting";
import Settings from "./components/pages/Settings/Settings";

export default () => {

    let routes = [
        {path: '/login', component: Login, isPublic: true},
        {path: '/password/reset/:token/:email', component: ResetPasswordReset, isPublic: true},
        {path: '/password/reset', component: ResetPasswordRequest, isPublic: true},
        {
            path: '/profile',
            component: Profile,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "profile"},
            ]
        },
    ];

    routes.push(
        {
            path: '/admins/create',
            component: Admin as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "admins", url: "/admins"},
                {label: "actions.creating"},
            ]
        },
        {
            path: '/admins/:id',
            component: Admin as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "admins", url: "/admins"},
                {label: ":id"},
            ]
        },
        {
            path: '/admins',
            component: Admins as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "admins"},
            ]
        }
    );

    routes.push(
        {
            path: '/roles/create',
            component: Role as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "roles", url: "/roles"},
                {label: "actions.creating"},
            ]
        },
        {
            path: '/roles/:id',
            component: Role as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "roles", url: "/roles"},
                {label: ":id"},
            ]
        },
        {
            path: '/roles',
            component: Roles as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "roles"},
            ]
        }
    );

    routes.push(
        {
            path: '/settings/create',
            component: Setting as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "settings", url: "/settings"},
                {label: "actions.creating"},
            ]
        },
        {
            path: '/settings/:id',
            component: Setting as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "settings", url: "/settings"},
                {label: ":id"},
            ]
        },
        {
            path: '/settings',
            component: Settings as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "settings"},
            ]
        }
    );

    routes.push({
        path: '/',
        component: Dashboard,
        breadcrumbs: [
            {label: "dashboard"},
        ]
    },);

    return routes;
}
