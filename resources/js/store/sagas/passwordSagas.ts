import {call, put, takeEvery} from 'redux-saga/effects';

import {PASSWORD_RESET_REQUEST, PASSWORD_SET_REQUEST} from "../constants/adminConstants";
import {setSubmitting} from "../actions/appActions";
import ApiProvider from "../../api/apiProvider";
import {getErrorResponseMessages} from "../../utils/errors";
import {
    getProfile,
    passwordResetFail,
    passwordResetSuccess,
    passwordSetFail,
    passwordSetSuccess
} from "../actions/adminActions";
import {IResetPasswordResponse} from "../../types/api";
import {showAlerts, successAlert} from "../../utils/alerts";

export function* passwordReset(action) {
    try {
        yield put(setSubmitting(true));
        const response : IResetPasswordResponse = yield call(ApiProvider.request, {
            endpoint: "password/email",
            method: "post",
            config: {data: action.payload}
        });
        yield put(passwordResetSuccess());
        if (response.data?.message) {
            successAlert(response.data.message);
        }
    } catch (e) {
        yield put(passwordResetFail());
    } finally {
        yield put(setSubmitting(false));
    }
}

export function* passwordResetSaga() {
    yield takeEvery(PASSWORD_RESET_REQUEST, passwordReset);
}

export function* passwordSet(action) {
    try {
        yield put(setSubmitting(true));
        const response = yield call(ApiProvider.request, {
            endpoint: "password/reset",
            method: "post",
            config: {data: action.payload}
        });
        successAlert(response.data.message);
        yield put(passwordSetSuccess());
        yield put(passwordResetSuccess());
    } catch (e) {
        yield put(passwordSetFail());
    } finally {
        yield put(setSubmitting(false));
    }
}

export function* passwordSetSaga() {
    yield takeEvery(PASSWORD_SET_REQUEST, passwordSet);
}
