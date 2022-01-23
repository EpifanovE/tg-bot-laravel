import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {setBreadcrumbs} from "../../../store/actions/appActions";
import MainChart from "../../layout/Widgets/MainChart";

const Dashboard = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {label: "dashboard"},
        ]));
    }, []);

    return (
        <>
            <MainChart />
        </>
    )
};

export default Dashboard;
