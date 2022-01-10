import {
    ADD_ALERT,
    CLEAR_ALERTS,
    NOTIFICATION_RECEIVED,
    REMOVE_ALERT,
    SET_BREADCRUMBS,
    SET_LOGOUT_LOADING,
    SET_NOT_FOUND,
    SET_OPENED_SIDEBAR_MENU_ITEM,
    SET_PREV_PATH,
    SET_SUBMITTING,
    SIDEBAR_HIDE,
    SIDEBAR_MINIMIZED_TOGGLE,
    SIDEBAR_SHOW,
    SIDEBAR_TOGGLE,
    TOGGLE_SIDEBAR_MENU_ITEM,
    USER_PANEL_MENU_CLOSE,
    USER_PANEL_MENU_TOGGLE
} from "../constants/appConstants";
import {IAlert, IBreadcrumb} from "../../types/app";
import {v4 as uuidv4} from "uuid";
import {PROFILE_SAVE_FAIL} from "../constants/adminConstants";

export interface IAppState {
    alerts: Array<IAlert>,
    sidebarMinimized: boolean,
    sidebarClosed?: boolean,
    breadcrumbs: Array<IBreadcrumb>
    prevPath?: string | null,
    submitting: boolean,
    userPanelMenuOpen: boolean,
    logoutLoading: boolean
    openedMenuItems: Array<string>
    notFound?: boolean
}

export const initialState: IAppState = {
    alerts: [],
    sidebarMinimized: false,
    breadcrumbs: [],
    prevPath: null,
    submitting: false,
    userPanelMenuOpen: false,
    logoutLoading: false,
    openedMenuItems: [],
    notFound: false
};

const appReducer = (state: IAppState = initialState, action) => {
    switch (action.type) {
        case SET_PREV_PATH :
            return {
                ...state,
                prevPath: action.payload,
            };
        case SET_BREADCRUMBS :
            return {
                ...state,
                breadcrumbs: action.payload
            };
        case SIDEBAR_TOGGLE :
            return {
                ...state,
                sidebarClosed: !state.sidebarClosed
            };

        case SIDEBAR_SHOW :
            return {
                ...state,
                sidebarClosed: false
            };
        case SIDEBAR_HIDE :
            return {
                ...state,
                sidebarClosed: true
            };
        case SIDEBAR_MINIMIZED_TOGGLE :
            return {
                ...state,
                sidebarMinimized: !state.sidebarMinimized
            };
        case NOTIFICATION_RECEIVED :
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            };
        case SET_SUBMITTING :
            return {
                ...state,
                submitting: action.payload
            };
        case USER_PANEL_MENU_TOGGLE :
            return {
                ...state,
                userPanelMenuOpen: !state.userPanelMenuOpen
            };
        case USER_PANEL_MENU_CLOSE:
            return {
                ...state,
                userPanelMenuOpen: false
            };
        case SET_LOGOUT_LOADING :
            return {
                ...state,
                logoutLoading: action.payload
            };
        case TOGGLE_SIDEBAR_MENU_ITEM :
            if (state.openedMenuItems.includes(action.payload)) {
                return {
                    ...state,
                    openedMenuItems: state.openedMenuItems.filter(item => item !== action.payload)
                };
            } else {
                return {
                    ...state,
                    openedMenuItems: [...state.openedMenuItems, action.payload]
                };
            }
        case ADD_ALERT :
            return {
                ...state,
                alerts: [
                    ...state.alerts,
                    {
                        id: uuidv4(),
                        mode: action.payload.mode,
                        message: action.payload.message,
                    }
                ]
            };
        case REMOVE_ALERT :
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload)
            };
        case CLEAR_ALERTS :
            return {
                ...state,
                alerts: []
            };
        case SET_NOT_FOUND :
            return {
                ...state,
                notFound: action.payload
            };
        default :
            return state;
    }
};

export default appReducer;
