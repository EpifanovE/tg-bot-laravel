import React, {useEffect, useState} from "react";
import Col from "../components/layout/Ui/Col";
import Card from "../components/layout/Ui/Card/Card";
import CardBody from "../components/layout/Ui/Card/CardBody";
import Row from "../components/layout/Ui/Row";
import {useTranslation} from "react-i18next";
import {adminCan} from "../utils/auth";

const useAccess = (permissions: Array<string>) => {

    const {t} = useTranslation();

    const [disallow, setDisallow] = useState(true);

    useEffect(() => {
        permissions.forEach(permission => {
            if (adminCan(permission)) {
                setDisallow(false);
            }
        });
    }, []);

    const messageComponent = <Row>
        <Col width={{"sm": 12}}>
            <Card>
                <CardBody>
                    {t("messages.noAccess")}
                </CardBody>
            </Card>
        </Col>
    </Row>;

    return {
        disallow,
        messageComponent
    }
};

export default useAccess;
