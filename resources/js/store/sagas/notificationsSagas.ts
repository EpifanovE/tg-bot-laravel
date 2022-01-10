import {call, put, takeEvery} from 'redux-saga/effects';
import {notificationsProvider} from "../../api/notifications";
import {START_NOTIFICATIONS_LISTENING} from "../constants/appConstants";
import {IAlert} from "../../types/app";
import {notificationReceived as notificationReceivedAction} from "../actions/appActions";
import {store} from "../../app";

function messageHandler(message: IAlert) {
    store.dispatch(notificationReceivedAction(message))
}

export function* startNotificationListening(action) {
    if (!action.payload) {
        return
    }

    try {
        yield call([notificationsProvider, "start"], action.payload);
        yield call([notificationsProvider, "subscribe"], messageHandler)
    } catch (e) {

    }
}

export function* startNotificationListeningSaga() {
    yield takeEvery(START_NOTIFICATIONS_LISTENING, startNotificationListening)
}
