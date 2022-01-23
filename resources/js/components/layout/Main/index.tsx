import React, {useEffect} from "react";
import Header from "../Header";
import Footer from "../Footer";
import Col from "../Ui/Col";
import Alerts from "../Alerts/Alerts";
import Row from "../Ui/Row";
import {useDispatch} from "react-redux";
import {clearAlerts} from "../../../store/actions/appActions";
import {IBreadcrumb} from "../../../types/app";

export interface MainProps {
    component: any
    breadcrumbs?: Array<IBreadcrumb>
}

const Main = ({component, breadcrumbs}: MainProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {dispatch(clearAlerts())};
    }, []);

    return <div className="c-wrapper c-fixed-components">
        <Header breadcrumbs={breadcrumbs} />
        <div className="c-body">
            <main className="c-main">
                <div className="container-fluid">
                    <Row>
                        <Col width={{sm: 12}}>
                            <Alerts />
                        </Col>
                    </Row>
                    <div className="fade-in">
                        {component}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    </div>
};

export default Main;
