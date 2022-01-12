import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {setBreadcrumbs} from "../../../store/actions/appActions";
import MainChart from "../../layout/Widgets/Charts/MainChart";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";



const Dashboard = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {label: "dashboard"},
        ]));
    }, []);

    return <div>
        <MainChart
            resource="newSubscribers"
            type={`line`}
            period={`month`}
            title={t('newSubscribers')}
            periodBar={true}
        />
    </div>
};

export default Dashboard;
