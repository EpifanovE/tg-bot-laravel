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
import NewSubscribers from "./components/pages/Analytics/NewSubscribers";
import UniqueUsages from "./components/pages/Analytics/UniqueUsages";
import Commands from "./components/pages/Analytics/Commands";
import Unhandled from "./components/pages/Analytics/Unhandled";
import Subscribers from "./components/pages/Subscribers/Subscribers";
import Subscriber from "./components/pages/Subscribers/Subscriber";
import AnalyticsSettings from "./components/pages/Settings/AnalyticsSettings";
import Messages from "./components/pages/Messages/Messages";
import Message from "./components/pages/Messages/Message";

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
            path: '/settings/analytics',
            component: AnalyticsSettings as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "settings",},
                {label: "analytics"},
            ]
        },
    );

    routes.push(
        {
            path: '/subscribers/:id',
            component: Subscriber as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "subscribers", url: "/subscribers"},
                {label: ":id"},
            ]
        },
        {
            path: '/subscribers',
            component: Subscribers as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "subscribers"},
            ]
        }
    );

    routes.push(
        {
            path: '/messages/create',
            component: Message as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "messagesList", url: "/messages"},
                {label: "actions.creating"},
            ]
        },
        {
            path: '/messages/:id',
            component: Message as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "messagesList", url: "/messages"},
                {label: ":id"},
            ]
        },
        {
            path: '/messages',
            component: Messages as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "messagesList"},
            ]
        }
    );

    routes.push(
        {
            path: '/subscribers-analytics',
            component: NewSubscribers as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "analytics"},
                {label: "newSubscribers"},
            ]
        },
        {
            path: '/usages-analytics',
            component: UniqueUsages as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "analytics"},
                {label: "uniqueUsages"},
            ]
        },
        {
            path: '/commands-analytics',
            component: Commands as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "analytics"},
                {label: "commands"},
            ]
        },
        {
            path: '/unhandled-analytics',
            component: Unhandled as any,
            breadcrumbs: [
                {label: "dashboard", url: "/"},
                {label: "analytics"},
                {label: "unhandled"},
            ]
        },
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
