import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Card from "../../layout/Ui/Card/Card";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import CardBody from "../../layout/Ui/Card/CardBody";
import TextInput from "../../inputs/TextInput";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import useRoleState from "./useRoleState";
import Checkbox from "../../inputs/Checkbox";
import {permissionLabel} from "./helpers";
import useAccess from "../../../hooks/useAccess";

interface IRoleProps {

}

const Role: FC<IRoleProps> = () => {

    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {
        role,
        saving,
        permissionsList,
        handleTextChange,
        handleSaveClick,
        handlePermissionClick,
    } = useRoleState();

    const {disallow, messageComponent} = useAccess(["roles.manage", "roles.view"]);

    if (disallow) {
        return messageComponent;
    }

    return <>
        <Row>
            <Col width={{"sm": 12, "lg": 9}}>
                <Card>
                    <CardHeader>
                        {t("settings")}
                    </CardHeader>

                    <CardBody>

                        <TextInput
                            label={t("name")}
                            value={role?.name || ""}
                            onChange={handleTextChange}
                            name="name"
                            required={true}
                        />

                        <TextInput
                            label={t("key")}
                            value={role?.key || ""}
                            onChange={handleTextChange}
                            name="key"
                            required={true}
                        />

                    </CardBody>
                </Card>


                <Card>
                    <CardHeader>
                        {t("permissionsLabel")}
                    </CardHeader>

                    <CardBody>
                        <Row>
                        {
                            permissionsList.groups.map(group => (
                                <Col key={group.title} width={{lg: 6, xl: 4}} className="mb-4">
                                    <div className="font-weight-bold mb-2">{t(`permissionsGroups.${group.title}`)}</div>
                                    {
                                        group.items.map(permission => (
                                            <Checkbox
                                                key={permission.code}
                                                value={`${permission}`}
                                                checked={!!role?.permissions?.includes(permission.code)}
                                                label={permissionLabel(permission.code)}
                                                onChange={handlePermissionClick}
                                                name={`${permission.code}`}
                                                className="mb-2"
                                            />
                                        ))
                                    }
                                </Col>
                            ))
                        }

                        <Col key="nogroup" width={{lg: 6, xl: 4}}>
                            {
                                permissionsList.items.map(permission => (
                                <Checkbox
                                    key={permission.code}
                                    value={`${permission}`}
                                    checked={!!role?.permissions?.includes(permission.code)}
                                    label={permissionLabel(permission.code)}
                                    onChange={handlePermissionClick}
                                    name={`${permission.code}`}
                                    className="mb-2"
                                />
                                ))
                            }
                        </Col>
                        </Row>
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
                    role.id &&
                    <Card>
                        <CardHeader>
                            {t("info")}
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex mb-2">
                                <span className="mr-2 font-weight-bold">{t("createdAt")}:</span>
                                <span>{moment(role.created_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                            </div>
                            <div className="d-flex">
                                <span className="mr-2 font-weight-bold">{t("updatedAt")}:</span>
                                <span>{moment(role.updated_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                            </div>
                        </CardBody>
                    </Card>
                }
            </Col>
        </Row>
    </>
};

export default Role;
