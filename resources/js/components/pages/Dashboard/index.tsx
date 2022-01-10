import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setBreadcrumbs} from "../../../store/actions/appActions";
import {useTranslation} from "react-i18next";

const Dashboard = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {label: "dashboard"},
        ]));
    }, []);

    return <div>Dashboard</div>
};

export default Dashboard;
