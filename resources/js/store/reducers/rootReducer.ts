import {combineReducers} from "redux";
import appReducer, {IAppState} from "./appReducer";
import adminReducer, {IAdminState} from "./adminReducer";

export interface IRootState {
    app: IAppState,
    admin: IAdminState
}

export const rootReducer = combineReducers({
    app: appReducer,
    admin: adminReducer
});
