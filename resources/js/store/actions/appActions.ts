import {
    ADD_ALERT, CLEAR_ALERTS,
    NOTIFICATION_RECEIVED, REMOVE_ALERT,
    SET_BREADCRUMBS,
    SET_LOGOUT_LOADING, SET_NOT_FOUND,
    SET_PREV_PATH,
    SET_SUBMITTING,
    SIDEBAR_HIDE,
    SIDEBAR_MINIMIZED_TOGGLE,
    SIDEBAR_SHOW,
    SIDEBAR_TOGGLE,
    START_NOTIFICATIONS_LISTENING,
    STOP_NOTIFICATIONS_LISTENING, TOGGLE_SIDEBAR_MENU_ITEM,
    USER_PANEL_MENU_CLOSE,
    USER_PANEL_MENU_TOGGLE
} from "../constants/appConstants";
import {IAlert, IBreadcrumb} from "../../types/app";

export const toggleSidebar = () => {
    return {type: SIDEBAR_TOGGLE};
};

export const showSidebar = () => {
    return {type: SIDEBAR_SHOW};
};

export const hideSidebar = () => {
    return {type: SIDEBAR_HIDE};
};

export const toggleMinimizedSidebar = () => {
    return {type: SIDEBAR_MINIMIZED_TOGGLE};
};

export const setBreadcrumbs = (breadcrumbs: Array<IBreadcrumb>) => {
    return {type: SET_BREADCRUMBS, payload: breadcrumbs};
};

export const setPrevPath = (prevPath?: string) => {
    return {type: SET_PREV_PATH, payload: prevPath};
};

export const setSubmitting = (isSubmitting: boolean) => {
    return {type: SET_SUBMITTING, payload: isSubmitting};
};

export const toggleUserPanelMenu = () => {
    return {type: USER_PANEL_MENU_TOGGLE};
};

export const closeUserPanelMenu = () => {
    return {type: USER_PANEL_MENU_CLOSE};
};

export const setLogoutLoading = (isLoading: boolean) => {
    return {type: SET_LOGOUT_LOADING, payload: isLoading};
};

export const notificationReceived = (message: IAlert) => {
    return {type: NOTIFICATION_RECEIVED, payload: message}
};

export const startNotificationsListening = (adminId?: number | null) => {
    return {type: START_NOTIFICATIONS_LISTENING, payload: adminId};
};

export const stopNotificationsListening = (adminId?: number | null) => {
    return {type: STOP_NOTIFICATIONS_LISTENING, payload: adminId};
};

export const toggleSidebarMenuItem = (key: string) => {
    return {type: TOGGLE_SIDEBAR_MENU_ITEM, payload: key};
};

export const addAlert = (alert: {mode: string, message: string}) => {
    return {type: ADD_ALERT, payload: alert};
};

export const removeAlert = (id: string) => {
    return {type: REMOVE_ALERT, payload: id};
};

export const clearAlerts = () => {
    return {type: CLEAR_ALERTS};
};

export const setNotFound = (isNotFound: boolean) => {
    return {type: SET_NOT_FOUND, payload: isNotFound};
};
