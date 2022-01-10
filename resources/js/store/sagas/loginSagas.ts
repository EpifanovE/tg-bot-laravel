import {call, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGOUT_REQUEST} from "../constants/adminConstants";
import ApiProvider from "../../api/apiProvider";
import {logoutSuccess, profileSuccess} from "../actions/adminActions";
import {setLogoutLoading, setSubmitting} from "../actions/appActions";

export function* login(action) {
    try {
        yield put(setSubmitting(true));
        const response = yield call(ApiProvider.request, {endpoint: 'login', method: "post", config: {data: action.payload}});
        yield call([ApiProvider, "refreshCsrf"]);
        yield put(profileSuccess(response.data));
    } catch (e) {

    } finally {
        yield put(setSubmitting(false));
    }
}

export function* loginSaga() {
    yield takeEvery(LOGIN_REQUEST, login);
}

export function* logout(action) {
    try {
        yield put(setLogoutLoading(true));
        yield call([ApiProvider, "request"], {endpoint: 'logout', method: "post"});
        yield call([ApiProvider, "refreshCsrf"]);
        yield put(logoutSuccess());
    } catch (e) {

    } finally {
        yield put(setLogoutLoading(false));
    }
}

export function* logoutSaga() {
    yield takeEvery(LOGOUT_REQUEST, logout);
}
