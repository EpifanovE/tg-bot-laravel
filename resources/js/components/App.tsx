import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {useMediaQuery} from 'react-responsive';
import {useTranslation} from "react-i18next";

import {IRootState} from "../store/reducers/rootReducer";
import routes from "../routes";
import {
    hideSidebar,
    showSidebar,
    startNotificationsListening,
    stopNotificationsListening
} from "../store/actions/appActions";
import {BREAKPOINTS, SCREEN_LG} from "../constants";
import ProtectedRoute from "./layout/Navigation/ProtectedRoute";
import {IAdminState} from "../store/reducers/adminReducer";
import {getProfile} from "../store/actions/adminActions";
import Wrapper from "./layout/Wrapper";
import Page404 from "./pages/404";
import {IAppState} from "../store/reducers/appReducer";

const App = (props) => {

    const dispatch = useDispatch();

    const isLgScreen = useMediaQuery({query: BREAKPOINTS[SCREEN_LG]});
    const {i18n} = useTranslation();
    const {isLoggedIn, loading: loadingProfile, locale, id} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {sidebarClosed} = useSelector<IRootState, IAppState>(state => state.app);

    useEffect(() => {
        if (isLgScreen && !sidebarClosed) {
            dispatch(showSidebar());
            return;
        } else if (!isLgScreen) {
            dispatch(hideSidebar());
            return;
        }
        dispatch(showSidebar());
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(getProfile());
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(locale)
    }, [locale]);

    useEffect(() => {
        dispatch(startNotificationsListening(id));

        return () => {
            dispatch(stopNotificationsListening(id));
        }
    }, [id]);


    if (loadingProfile) {
        return <div>Loading...</div>
    }

    const routeComponents = routes().map(({path, component: Component, isPublic, breadcrumbs}, key) => {
        return isPublic
            ? <Route exact path={path} component={Component} key={key}/>
            : <ProtectedRoute exact path={path} render={() => <Wrapper breadcrumbs={breadcrumbs}><Component/></Wrapper>}
                              key={key}/>;
    });

    return <Switch>
        {routeComponents}
        <Route component={Page404}/>
    </Switch>;
};

export default App;
