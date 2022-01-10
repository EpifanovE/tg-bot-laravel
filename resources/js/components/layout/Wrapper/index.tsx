import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import Sidebar from "../Sidebar";
import Main from "../Main";
import {setBreadcrumbs, setNotFound} from "../../../store/actions/appActions";
import {useDispatch, useSelector} from "react-redux";
import {IBreadcrumb} from "../../../types/app";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import Page404 from "../../pages/404";

interface IWrapperProps {
    breadcrumbs?: Array<IBreadcrumb>
}

const Wrapper: FC<IWrapperProps> = ({children, breadcrumbs}) => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const {notFound} = useSelector<IRootState, IAppState>(state => state.app);

    useEffect(() => {
        if (breadcrumbs) {
            dispatch(setBreadcrumbs(breadcrumbs.map(item => {
                if (item.label === ':id' && id) {
                    return {...item, label: id}
                }
                return item;
            })));
        }
    }, []);

    useEffect(() => {
        dispatch(setNotFound(false));
    }, []);

    if (notFound) {
        return <Page404 />
    }

    return <>
        <Sidebar/>
        <Main component={children}/>
    </>
};

export default Wrapper;
