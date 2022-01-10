import React, {FC, ReactNode, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Redirect, useLocation} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {setPrevPath} from "../../../store/actions/appActions";

interface IProtectedRouteProps {
    exact?: boolean
    path: string
    component?: any
    render?: ReactNode
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({...props}) => {

    const dispatch = useDispatch();
    const {pathname} = useLocation();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(setPrevPath(pathname));
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return <Route {...props} />
    }

    return <Redirect to="/login" />
};

export default ProtectedRoute;
