import React, {FC} from "react";
import Alert from "./Alert";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {removeAlert} from "../../../store/actions/appActions";

interface IAlertsProps {

}

const Alerts: FC<IAlertsProps> = () => {

    const {alerts} = useSelector<IRootState, IAppState>(state => state.app);

    const dispatch = useDispatch();

    const handleCloseAlertClick = (id: string) => {
        dispatch(removeAlert(id));
    };

    return <>
        {alerts.map(alert => <Alert key={alert.id} {...alert} onCloseClick={handleCloseAlertClick} />)}
    </>

};

export default Alerts;
