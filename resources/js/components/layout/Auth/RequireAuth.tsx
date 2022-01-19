import React, {FC, useEffect} from "react";
import {Navigate, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {setPrevPath} from "../../../store/actions/appActions";

const RequireAuth: FC = ({children}) => {

    const dispatch = useDispatch();
    const {pathname} = useLocation();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(setPrevPath(pathname));
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return <>{children}</>
    }

    return <Navigate to="/login" />
}

export default RequireAuth;
