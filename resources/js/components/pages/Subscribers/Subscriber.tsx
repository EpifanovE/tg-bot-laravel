import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import useAccess from "../../../hooks/useAccess";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Card from "../../layout/Ui/Card/Card";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import CardBody from "../../layout/Ui/Card/CardBody";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import moment from "moment";
import useSubscriberState from "./useSubscriberState";
import Spinner from "../../layout/Ui/Spinner";
import TextInput from "../../inputs/TextInput";
import ReferenceSelect from "../../inputs/ReferenceSelect";

const Subscriber: FC = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["subscribers.manage", "subscribers.view"]);

    const {subscriber, saving, blocking, handleBlockClick, handleSaveClick, handleTextChange, handleAdminChange} = useSubscriberState();

    if (disallow) {
        return messageComponent;
    }

    if (!subscriber) {
        return <Row>
            <Col width={{"sm": 12}} className={`d-flex justify-content-center`}>
                <Spinner />
            </Col>
        </Row>
    }

    return (
        <>
            <Row>
                <Col width={{"sm": 12, "lg": 9}}>
                    <Card>
                        <CardHeader>
                            {t("info")}
                        </CardHeader>

                        <CardBody>

                            <TextInput
                                label={`ID`}
                                value={subscriber.id.toString()}
                                onChange={handleTextChange}
                                name="id"
                                readOnly={true}
                            />

                            <TextInput
                                label={t("tid")}
                                value={subscriber.tid.toString() || ""}
                                onChange={handleTextChange}
                                name="tid"
                                readOnly={true}
                            />


                            <TextInput
                                label={t("first_name")}
                                value={subscriber.first_name || ""}
                                onChange={handleTextChange}
                                name="first_name"
                                readOnly={true}
                            />

                            <TextInput
                                label={t("last_name")}
                                value={subscriber.last_name || ""}
                                onChange={handleTextChange}
                                name="last_name"
                                readOnly={true}
                            />

                            <TextInput
                                label={t("username")}
                                value={subscriber.username || ""}
                                onChange={handleTextChange}
                                name="username"
                                readOnly={true}
                            />

                            <TextInput
                                label={t("language")}
                                value={subscriber.language_code || ""}
                                onChange={handleTextChange}
                                name="language_code"
                                readOnly={true}
                            />

                        </CardBody>
                    </Card>
                </Col>

                <Col width={{"sm": 12, "lg": 3}}>
                    <Card>
                        <CardHeader>
                            {t("actionsLabel")}
                        </CardHeader>

                        <CardBody>
                            <Button
                                color="outline-primary"
                                className="d-flex align-items-center w-100 justify-content-center mb-2"
                                type="button"
                                onClick={handleSaveClick}
                                spinner={saving}
                            >
                                <Icon name="save" className="mr-2"/>
                                {t("buttons.save")}
                            </Button>

                            <Button
                                color={`outline-${subscriber.blocked ? "success" : "danger"}`}
                                className="d-flex align-items-center w-100 justify-content-center"
                                type="button"
                                onClick={handleBlockClick}
                                spinner={blocking}
                            >
                                <Icon name="ban" className="mr-2"/>
                                {subscriber.blocked ? t("buttons.unblock") : t("buttons.block")}
                            </Button>

                        </CardBody>
                    </Card>

                        <Card>
                            <CardHeader>
                                {t("advanced")}
                            </CardHeader>

                            <CardBody>
                                <ReferenceSelect
                                    label={t("admin")}
                                    value={subscriber.admin_id ? [subscriber.admin_id] : []}
                                    resource={`admins`}
                                    onChange={handleAdminChange}
                                    resettable={true}
                                    labelField={`name`}
                                    className={`mb-4`}
                                />
                                <div className="d-flex mb-2">
                                    <span className="mr-2 font-weight-bold">{t("createdAt")}:</span>
                                    <span>{moment(subscriber.created_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                </div>
                                <div className="d-flex">
                                    <span className="mr-2 font-weight-bold">{t("updatedAt")}:</span>
                                    <span>{moment(subscriber.updated_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                </div>
                            </CardBody>
                        </Card>

                </Col>
            </Row>
        </>
    )
};

export default Subscriber;
