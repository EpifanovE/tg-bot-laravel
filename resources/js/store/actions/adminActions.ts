import {ILoginRequest, ILoginResponse, IProfileResponse} from "../../types/api";
import {
    SET_LOCALE,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_SET_FAIL,
    PASSWORD_SET_REQUEST,
    PASSWORD_SET_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_CHANGE_FIELD,
    PROFILE_SAVE_REQUEST,
    PROFILE_SAVE_SUCCESS,
    PROFILE_CHANGE_FIELDS,
    PROFILE_SAVE_FAIL,
} from "../constants/adminConstants";

export const loginRequest = (data: ILoginRequest) => {
    return {type: LOGIN_REQUEST, payload: data};
};

export const loginFail = () => {
    return {type: LOGIN_FAIL}
};

export const loginSuccess = (data: ILoginResponse) => {
    return {type: LOGIN_SUCCESS, payload: data};
};

export const logoutRequest = () => {
    return {type: LOGOUT_REQUEST};
};

export const logoutSuccess = () => {
    return {type: LOGOUT_SUCCESS};
};

export const getProfile = () => {
    return {type: PROFILE_REQUEST};
};

export const profileFail = () => {
    return {type: PROFILE_FAIL};
};

export const profileSuccess = (data: IProfileResponse) => {
    return {type: PROFILE_SUCCESS, payload: data};
};

export const passwordResetRequest = (data: { email: string }) => {
    return {type: PASSWORD_RESET_REQUEST, payload: data};
};

export const passwordResetSuccess = () => {
    return {type: PASSWORD_RESET_SUCCESS};
};

export const passwordResetFail = () => {
    return {type: PASSWORD_RESET_FAIL};
};

export const passwordSetRequest = (data: { password: string, password_confirmation: string, token: string, email: string }) => {
    return {type: PASSWORD_SET_REQUEST, payload: data};
};

export const passwordSetSuccess = () => {
    return {type: PASSWORD_SET_SUCCESS};
};

export const passwordSetFail = () => {
    return {type: PASSWORD_SET_FAIL};
};

export const changeProfileField = (data: {fieldName: string, value: string}) => {
    return {type: PROFILE_CHANGE_FIELD, payload: data};
};

export const changeProfileFields = (data: {[key: string]: string}) => {
    return {type: PROFILE_CHANGE_FIELDS, payload: data};
};

export const profileSaveRequest = () => {
    return {type: PROFILE_SAVE_REQUEST};
};

export const profileSaveSuccess = () => {
    return {type: PROFILE_SAVE_SUCCESS};
};

export const profileSaveFail = () => {
    return {type: PROFILE_SAVE_FAIL};
};
