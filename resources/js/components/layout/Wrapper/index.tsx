import React, {FC, useEffect} from "react";
import Sidebar from "../Sidebar";
import Main from "../Main";
import {setNotFound} from "../../../store/actions/appActions";
import {useDispatch, useSelector} from "react-redux";
import {IBreadcrumb} from "../../../types/app";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import Page404 from "../../pages/404";

interface IWrapperProps {
    breadcrumbs?: Array<IBreadcrumb>
}

const Wrapper: FC<IWrapperProps> = ({children, breadcrumbs}) => {

    const dispatch = useDispatch();
    const {notFound} = useSelector<IRootState, IAppState>(state => state.app);

    useEffect(() => {
        dispatch(setNotFound(false));
    }, []);

    if (notFound) {
        return <Page404 />
    }

    return <>
        <Sidebar/>
        <Main component={children} breadcrumbs={breadcrumbs}/>
    </>
};

export default Wrapper;
