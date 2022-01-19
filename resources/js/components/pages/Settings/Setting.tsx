import React, {FC, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import useAccess from "../../../hooks/useAccess";
import useSettingState from "./useSettingState";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Card from "../../layout/Ui/Card/Card";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import CardBody from "../../layout/Ui/Card/CardBody";
import TextInput from "../../inputs/TextInput";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import moment from "moment";
import CustomSelect from "../../inputs/CustomSelect";
import Payload from "../../layout/Payload/Payload";

const Setting: FC = () => {

    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {setting, createdSettingId, saving, handleTextChange, handleSaveClick, handleTypeChange, handlePayloadChange} = useSettingState();

    const {disallow, messageComponent} = useAccess(["roles.manage", "roles.view"]);

    if (disallow) {
        return messageComponent;
    }

    if (createdSettingId) {
        return <Navigate to={`/settings/${createdSettingId}`}/>
    }

    return <>
        <Row>
            <Col width={{"sm": 12, "lg": 9}}>
                <Card>
                    <CardHeader>
                        {t("content")}
                    </CardHeader>

                    <CardBody>
                        <Payload
                            type={setting.type}
                            value={setting.payload.value}
                            onChange={handlePayloadChange}
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        {t("settings")}
                    </CardHeader>

                    <CardBody>

                        <TextInput
                            label={t("name")}
                            value={setting?.name || ""}
                            onChange={handleTextChange}
                            name="name"
                            required={true}
                            disabled={setting.built_in}
                        />

                        <TextInput
                            label={t("code")}
                            value={setting?.code || ""}
                            onChange={handleTextChange}
                            name="code"
                            required={true}
                            disabled={setting.built_in}
                        />

                        <CustomSelect
                            value={setting.type ? [setting.type] : []}
                            onChange={handleTypeChange}
                            label={t("type")}
                            required={true}
                            disabled={setting.built_in}
                            choices={[
                                {
                                    value: "text",
                                    label: t(`settingsTypes.text`)
                                },
                                {
                                    value: "textarea",
                                    label: t(`settingsTypes.textarea`)
                                },
                                {
                                    value: "number",
                                    label: t(`settingsTypes.number`)
                                },
                                {
                                    value: "checkbox",
                                    label: t(`settingsTypes.checkbox`)
                                },
                            ]}
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
                            className="d-flex align-items-center w-100 justify-content-center"
                            type="button"
                            onClick={handleSaveClick}
                            spinner={saving}
                        >
                            <Icon name="save" className="mr-2"/>
                            {t("buttons.save")}
                        </Button>
                    </CardBody>
                </Card>
                {
                    setting.id &&
                    <Card>
                        <CardHeader>
                            {t("info")}
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex mb-2">
                                <span className="mr-2 font-weight-bold">{t("createdAt")}:</span>
                                <span>{moment(setting.created_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                            </div>
                            <div className="d-flex">
                                <span className="mr-2 font-weight-bold">{t("updatedAt")}:</span>
                                <span>{moment(setting.updated_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                            </div>
                        </CardBody>
                    </Card>
                }
            </Col>
        </Row>
    </>
};

export default Setting;
