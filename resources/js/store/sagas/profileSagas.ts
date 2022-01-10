import {call, put, takeEvery, select} from 'redux-saga/effects'
import {PROFILE_REQUEST, PROFILE_SAVE_REQUEST} from "../constants/adminConstants";
import ApiProvider from "../../api/apiProvider";
import {profileSuccess, profileFail, profileSaveSuccess, profileSaveFail} from "../actions/adminActions";
import {IProfileResponse} from "../../types/api";
import {IRootState} from "../reducers/rootReducer";
import {IAdminState} from "../reducers/adminReducer";
import {saveSuccessAlert} from "../../utils/alerts";

const getState = (state: IRootState) => state.admin;

export function* getProfile(action) {
    try {
        const response = yield call([ApiProvider, "request"], {endpoint: "profile", method: "get"});
        yield put(profileSuccess(response.data as IProfileResponse))
    } catch (e) {
        yield put(profileFail());
    }
}

export function* getProfileSaga() {
    yield takeEvery(PROFILE_REQUEST, getProfile);
}

export function* saveProfile(action) {
    try {
        const adminState: IAdminState = yield select(getState);
        const {name, email, password, password_confirmation} = adminState;

        const data = {name, email};

        if (password && password_confirmation) {
            data['password'] = password;
            data['password_confirmation'] = password_confirmation;
        }

        const response = yield call([ApiProvider, "request"], {
            endpoint: "profile",
            method: "put",
            config: {data}
        });

        yield call(saveSuccessAlert);
        yield put(profileSaveSuccess());

    } catch (e) {
        yield put(profileSaveFail());
    }
}

export function* saveProfileSaga() {
    yield takeEvery(PROFILE_SAVE_REQUEST, saveProfile);
}
