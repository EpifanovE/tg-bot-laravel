import {store} from "../app";

export const adminCan = (permission: string): boolean => {
    const state = store.getState();
    return state.admin.permissions.includes(permission)
};

export const adminCant = (permission: string): boolean => {
    const state = store.getState();
    return !state.admin.permissions.includes(permission)
};
