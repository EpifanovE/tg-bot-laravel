import {SIDEBAR_HIDE, SIDEBAR_MINIMIZED_TOGGLE, SIDEBAR_SHOW, SIDEBAR_TOGGLE} from "../constants/appConstants";
import {PROFILE_SAVE_REQUEST} from "../constants/adminConstants";
import {IAppState, initialState} from "../reducers/appReducer";
import {initialState as adminInitialState} from "../reducers/adminReducer";
import {ILocalStorageState} from "../../types/app";

const ACTIONS = [
    SIDEBAR_MINIMIZED_TOGGLE,
    SIDEBAR_TOGGLE,
    SIDEBAR_SHOW,
    SIDEBAR_HIDE,
    PROFILE_SAVE_REQUEST,
];

export const localStorageMiddleware = ({getState}) => {
    return (next) => (action: {type: string, payload: any}) => {
        const result = next(action);
        if (ACTIONS.includes(action.type)) {
            const appLocalStorageState = localStorage.getItem("appState");

                const newState = {
                    ...JSON.parse(appLocalStorageState ? appLocalStorageState : "{}"),
                    sidebarMinimized: getState().app.sidebarMinimized,
                    sidebarClosed: getState().app.sidebarClosed,
                    locale: getState().admin.locale,
                };

                localStorage.setItem("appState", JSON.stringify(newState))
        }
    }
};

export const reHydrateLocalStorageState = (): {app: IAppState} => {
    const lsStateString: string | null = localStorage.getItem("appState");

    const currentState = {app: initialState, admin: adminInitialState};

    if (!lsStateString) {
        return currentState
    }

    const lsState: ILocalStorageState = JSON.parse(lsStateString);

    currentState.app.sidebarClosed = !!lsState.sidebarClosed;
    currentState.app.sidebarMinimized = !!lsState.sidebarMinimized;

    if (lsState.locale) {
        currentState.admin.locale = lsState.locale;
    }

    return currentState;
};
