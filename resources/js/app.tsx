require('./bootstrap');

import "./bootstrap";
import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
// import Echo from 'laravel-echo';
// import {io} from 'socket.io-client';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import App from "./components/App";
import {rootReducer} from "./store/reducers/rootReducer";
import "./i18n/i18n";
import {APP_PREFIX} from "./constants";
import {getProfileSaga, saveProfileSaga} from "./store/sagas/profileSagas";
import {loginSaga, logoutSaga} from "./store/sagas/loginSagas";
import {passwordResetSaga, passwordSetSaga} from "./store/sagas/passwordSagas";
import {startNotificationListeningSaga} from "./store/sagas/notificationsSagas";
import {localStorageMiddleware, reHydrateLocalStorageState} from "./store/middleware/localStorage";


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    reHydrateLocalStorageState(),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, localStorageMiddleware),
    )
);

sagaMiddleware.run(getProfileSaga);
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(logoutSaga);
sagaMiddleware.run(passwordResetSaga);
sagaMiddleware.run(passwordSetSaga);
sagaMiddleware.run(startNotificationListeningSaga);
sagaMiddleware.run(saveProfileSaga);


const appElement = document.getElementById('admin');

ReactDOM.render(
    <Provider store={store}>
        <Router basename={APP_PREFIX}>
            <App/>
        </Router>
        <ToastContainer theme="colored" />
    </Provider>
    , appElement);
