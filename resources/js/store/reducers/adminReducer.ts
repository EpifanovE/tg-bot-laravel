import {
    SET_LOCALE,
    LOGOUT_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_CHANGE_FIELD,
    PROFILE_SAVE_SUCCESS,
    PROFILE_SAVE_REQUEST,
    PROFILE_CHANGE_FIELDS,
    PROFILE_SAVE_FAIL
} from "../constants/adminConstants";

export interface IAdminState {
    loading: boolean
    isLoggedIn: boolean
    id?: number | null
    name?: string
    email?: string
    permissions: Array<string>
    avatar?: string | null
    locale: string
    password?: string
    password_confirmation?: string
    saving: boolean
}

export const initialState: IAdminState = {
    loading: true,
    isLoggedIn: false,
    id: null,
    permissions: [],
    avatar: null,
    locale: "ru",
    saving: false
};


const adminReducer = (state: IAdminState = initialState, action) => {
    switch (action.type) {
        case PROFILE_REQUEST :
            return {
                ...state,
                loading: true,
            };
        case PROFILE_SUCCESS :
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                id: action.payload.data.id,
                permissions: action.payload.data.permissions,
                name: action.payload.data.name,
                email: action.payload.data.email
            };
        case PROFILE_FAIL :
            return {
                ...state,
                isLoggedIn: false,
                id: null,
                permissions: [],
                avatar: null,
                loading: false
            };
        case LOGOUT_SUCCESS :
            return {
                ...state,
                isLoggedIn: false,
                permissions: [],
            };
        case PROFILE_CHANGE_FIELD :
            return  {
                ...state,
                isDirty: true,
                [action.payload.fieldName]: action.payload.value,
            };
        case PROFILE_CHANGE_FIELDS :
            return {
                ...state,
                ...action.payload,
            };
        case PROFILE_SAVE_REQUEST :
            return {
                ...state,
                saving: true
            };
        case PROFILE_SAVE_SUCCESS :
            return {
                ...state,
                isDirty: false,
                saving: false
            };
        case PROFILE_SAVE_FAIL :
            return {
                ...state,
                saving: false,
            };
        default :
            return state;
    }
};

export default adminReducer;
