import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import moment from "moment";
import {Navigate} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import useAdminState from "./useAdminState";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Card from "../../layout/Ui/Card/Card";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import CardBody from "../../layout/Ui/Card/CardBody";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import TextInput from "../../inputs/TextInput";
import ReferenceSelect from "../../inputs/ReferenceSelect";
import CustomSelect from "../../inputs/CustomSelect";
import {STATUS_ACTIVE, STATUS_DISABLED, statusText} from "./helpers";
import useAccess from "../../../hooks/useAccess";

interface IAdminProps {

}

const Admin: FC<IAdminProps> = () => {

    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {admin, handleSaveClick, handleTextChange, handleRolesChange, handleStatusChange, saving, createdAdminId} = useAdminState();

    const {disallow, messageComponent} = useAccess(["admins.manage", "admins.view"]);

    if (disallow) {
        return messageComponent;
    }

    if (createdAdminId) {
        return <Navigate to={`/admins/${createdAdminId}`}/>
    }


    return (
        <>
            <Row>
                <Col width={{"sm": 12, "lg": 9}}>
                    <Card>
                        <CardHeader>
                            {t("settings")}
                        </CardHeader>

                        <CardBody>

                            <TextInput
                                label={t("username")}
                                value={admin?.name || ""}
                                onChange={handleTextChange}
                                name="name"
                                required={true}
                            />

                            <TextInput
                                label={t("email")}
                                value={admin?.email || ""}
                                onChange={handleTextChange}
                                name="email"
                                required={true}
                            />

                            <div className="mb-4">
                                <ReferenceSelect
                                    resource="roles"
                                    value={admin.roles}
                                    onChange={handleRolesChange}
                                    label={t("roles")}
                                    placeholder={t("actions.choose")}
                                    multiple={true}
                                    labelField={"name"}
                                    resettable={true}
                                    required={true}
                                />
                            </div>

                            <div className="mb-4">
                                <CustomSelect
                                    value={[admin.status]}
                                    onChange={handleStatusChange}
                                    label={t("status")}
                                    required={true}
                                    choices={[
                                        {
                                            value: STATUS_ACTIVE,
                                            label: statusText(STATUS_ACTIVE),
                                        },
                                        {
                                            value: STATUS_DISABLED,
                                            label: statusText(STATUS_DISABLED),
                                        }
                                    ]}
                                />
                            </div>

                            <TextInput
                                label={t("newPassword")}
                                onChange={handleTextChange}
                                value={admin?.password || ""}
                                name="password"
                                type="password"
                                required={!admin.id}
                            />

                            <TextInput
                                label={t("passwordConfirm")}
                                value={admin?.password_confirmation || ""}
                                onChange={handleTextChange}
                                name="password_confirmation"
                                type="password"
                                required={!admin.id}
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
                        admin.id &&
                        <Card>
                            <CardHeader>
                                {t("info")}
                            </CardHeader>

                            <CardBody>
                                <div className="d-flex mb-2">
                                    <span className="mr-2 font-weight-bold">{t("createdAt")}:</span>
                                    <span>{moment(admin.created_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                </div>
                                <div className="d-flex">
                                    <span className="mr-2 font-weight-bold">{t("updatedAt")}:</span>
                                    <span>{moment(admin.updated_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                </div>
                            </CardBody>
                        </Card>
                    }
                </Col>
            </Row>
        </>
    )
};

export default Admin;
