import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import moment from "moment";
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
import useMessageState from "./useMessageState";
import {ParseMode, SaveMode} from "./types";
import TextInput from "../../inputs/TextInput";
import TextareaInput from "../../inputs/TextareaInput";
import Datetime from "react-datetime";
import ReferenceSelect from "../../inputs/ReferenceSelect";
import {statusMode, statusText} from "./utils";
import Badge from "../../layout/Badge/Badge";
import ImageInput from "../../inputs/ImageInput/ImageInput";
import {IFileResponse} from "../../inputs/ImageInput/types";
import {useApi} from "../../../hooks/useApi";
import {API_PREFIX} from "../../../constants";

const Message: FC = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {
        message,
        saving,
        saveMode,
        adminIds,
        uploadedFiles,
        filesToUpload,
        handleSaveClick,
        handleSaveModeClick,
        handleNameChange,
        handleBodyChange,
        handleParseModeChange,
        handleAdminIdsChange,
        handleChangeRunAt,
        handleFilesToUploadChange,
    } = useMessageState();

    const {disallow, messageComponent} = useAccess(["messages.manage", "messages.view"]);

    const getSaveModeButtonClass = (value: string) => {
        return `w-100 btn ${value === saveMode ? 'btn btn-secondary' : 'btn-outline-secondary'}`
    }

    const getParseModeButtonClass = (value: string) => {
        return `w-100 btn ${value === message?.parse_mode ? 'btn btn-secondary' : 'btn-outline-secondary'}`
    }

    if (disallow) {
        return messageComponent;
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
                                label={t("name")}
                                value={message?.name || ""}
                                onChange={handleNameChange}
                                name="name"
                            />

                            <TextareaInput
                                label={t("message")}
                                value={message?.body || ""}
                                onChange={handleBodyChange}
                                name="body"
                                rows={12}
                            />

                            <div className={`form-group`}>
                                <label className={`form-label`}>{t("parseMode")}</label>
                                <div className={`input-group`}>
                                    <div className="btn-group">
                                        <Button
                                            className={`${getParseModeButtonClass(ParseMode.HTML)}`}
                                            onClick={handleParseModeChange}
                                            attrs={{
                                                "data-value": ParseMode.HTML,
                                            }}
                                        >
                                            HTML
                                        </Button>
                                        <Button
                                            className={`${getParseModeButtonClass(ParseMode.MD)}`}
                                            onClick={handleParseModeChange}
                                            attrs={{
                                                "data-value": ParseMode.MD,
                                            }}
                                        >
                                            Markdown
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            {t("images")}
                        </CardHeader>

                        <CardBody>
                            <ImageInput
                                filesToUpload={filesToUpload}
                                onChange={handleFilesToUploadChange}
                                uploadedFiles={uploadedFiles}
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
                                className="d-flex align-items-center w-100 justify-content-center mb-4"
                                type="button"
                                onClick={handleSaveClick}
                                spinner={saving}
                            >
                                <Icon name="save" className="mr-2"/>
                                {t("buttons.save")}
                            </Button>
                            <div className="btn-group-vertical w-100">
                                <Button
                                    className={`${getSaveModeButtonClass(SaveMode.Draft)}`}
                                    onClick={handleSaveModeClick}
                                    attrs={{
                                        "data-value": SaveMode.Draft,
                                    }}
                                >
                                    {t("saveModes.draft")}
                                </Button>
                                <Button
                                    className={`${getSaveModeButtonClass(SaveMode.Publish)}`}
                                    onClick={handleSaveModeClick}
                                    attrs={{
                                        "data-value": SaveMode.Publish,
                                    }}
                                >
                                    {t("saveModes.publish")}
                                </Button>
                                <Button
                                    className={`${getSaveModeButtonClass(SaveMode.Test)}`}
                                    onClick={handleSaveModeClick}
                                    attrs={{
                                        "data-value": SaveMode.Test,
                                    }}
                                >
                                    {t("saveModes.test")}
                                </Button>
                                <Button
                                    className={`${getSaveModeButtonClass(SaveMode.Planned)}`}
                                    onClick={handleSaveModeClick}
                                    attrs={{
                                        "data-value": SaveMode.Planned,
                                    }}
                                >
                                    {t("saveModes.planned")}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                    {
                        saveMode === SaveMode.Test &&
                        <Card>
                            <CardHeader>
                                {t("chooseAdmin")}
                            </CardHeader>

                            <CardBody>
                                <ReferenceSelect
                                    resource={`admins`}
                                    value={adminIds}
                                    onChange={handleAdminIdsChange}
                                    filter={{
                                        has_subscriber: 1,
                                    }}
                                    labelField={`name`}
                                    multiple={true}
                                    resettable={true}
                                />
                            </CardBody>
                        </Card>
                    }
                    {
                        saveMode === SaveMode.Planned &&
                        <Card>
                            <CardHeader>
                                {t("scheduler")}
                            </CardHeader>

                            <CardBody>
                                <div className={`form-group`}>
                                    <label className={`form-label`}>{t("publishTime")}</label>
                                    <Datetime
                                        value={message?.run_at || undefined}
                                        locale="ru"
                                        dateFormat="DD.MM.YYYY"
                                        timeFormat="HH:mm"
                                        className={`mr-2 mb-3`}
                                        onChange={handleChangeRunAt}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    }
                    {
                        message?.id &&
                        <Card>
                            <CardHeader>
                                {t("info")}
                            </CardHeader>

                            <CardBody>
                                <div className="d-flex align-items-center mb-2">
                                    <span className="mr-2 font-weight-bold">{t("status")}:</span>
                                    <Badge mode={statusMode(message.status)}>{statusText(message.status)}</Badge>
                                </div>
                                {
                                    message?.published_at &&
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="mr-2 font-weight-bold">{t("publishedAt")}:</span>
                                        <span>{moment(message.published_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                    </div>
                                }
                                <div className="d-flex align-items-center mb-2">
                                    <span className="mr-2 font-weight-bold">{t("createdAt")}:</span>
                                    <span>{moment(message.created_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="mr-2 font-weight-bold">{t("updatedAt")}:</span>
                                    <span>{moment(message.updated_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                                </div>
                            </CardBody>
                        </Card>
                    }
                </Col>
            </Row>
        </>
    )
}

export default Message;
