import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
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
import RequireAuth from "./layout/Auth/RequireAuth";

const App = (props) => {

    const dispatch = useDispatch();

    const isLgScreen = useMediaQuery({query: BREAKPOINTS[SCREEN_LG]});
    const {i18n} = useTranslation();
    const {
        isLoggedIn,
        loading: loadingProfile,
        locale,
        id
    } = useSelector<IRootState, IAdminState>(state => state.admin);
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
            ? <Route path={path} element={<Component/>} key={key} />
            : <Route path={path} element={(
                <RequireAuth>
                    <Wrapper breadcrumbs={breadcrumbs}>
                        <Component/>
                    </Wrapper>
                </RequireAuth>
            )}
             key={key}/>;
    });

    return <Routes>
        <Route path={`*`} element={<Page404/>}/>
        {routeComponents}
    </Routes>;
};

export default App;
