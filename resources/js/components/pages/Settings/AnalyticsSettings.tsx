import React, {FC, useEffect, useState} from "react";
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
import moment, {Moment} from "moment";
import {IAnalyticsSettings} from "./types";
import {useApi} from "../../../hooks/useApi";
import Spinner from "../../layout/Ui/Spinner";
import {API_PREFIX} from "../../../constants";
import Checkbox from "../../inputs/Checkbox";
import {successAlert} from "../../../utils/alerts";
import Datetime from "react-datetime";

const AnalyticsSettings: FC = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["settings.manage", "settings.view"]);

    const [settings, setSettings] = useState<IAnalyticsSettings>();
    const [events, setEvents] = useState<Array<string>>([]);
    const [cleanPeriod, setCleanPeriod] = useState<"all" | "date">();
    const [cleanDate, setCleanDate] = useState<Moment | string>();
    const [cleaning, setCleaning] = useState(false);

    const [saving, setSaving] = useState(false);

    const api = useApi();

    useEffect(() => {
        api
            .request<Array<string>>({
                url: `${API_PREFIX}/settings/analytics/events`,
                method: "get"
            })
            .then(response => {
                if (response?.data) {
                    setEvents(response.data);
                }
            })
    }, []);

    useEffect(() => {
        api
            .request<{data: IAnalyticsSettings}>({
                url: `${API_PREFIX}/settings/analytics`,
                method: "get",
            })
            .then(response => {
                if (response?.data?.data) {
                    setSettings(response.data.data);
                }
            })

    }, []);

    if (disallow) {
        return messageComponent;
    }

    const handleSaveClick = () => {
        if (saving) return;

        setSaving(true);

        api
            .request<{data: IAnalyticsSettings}>({
                url: `${API_PREFIX}/settings/analytics`,
                method: "put",
                config: {
                    data: settings?.payload
                }
            })
            .then(response => {
                if (response?.data?.data) {
                    setSettings(response.data.data);
                }
                successAlert(t("messages.saveSuccess"))
            })
            .finally(() => {
                setSaving(false);
            })
    };

    const handleEventClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (settings?.payload.events.includes(event.target.name)) {
            setSettings({
                ...settings,
                payload: {
                    ...settings.payload,
                    events: settings.payload.events.filter(item => item !== event.target.name)
                }
            })
        } else if (!!settings) {
            setSettings({
                ...settings,
                payload: {
                    ...settings.payload,
                    events: [
                        ...settings.payload.events,
                        event.target.name
                    ]
                }
            })
        }
    }

    const handleCleanClick = () => {
        if (!cleanPeriod || (cleanPeriod === "date" && !cleanDate )) return;

        if (cleaning) return;

        if (!confirm(t("messages.deleteConfirm"))) return;

        setCleaning(true);

        api
            .request<{count: number}>({
                url: `${API_PREFIX}/settings/analytics/clean`,
                method: "post",
                config: {
                    data: cleanPeriod === "date" && cleanDate ? {
                        date: cleanDate.toString(),
                    } : {}
                }
            })
            .then(response => {
                successAlert(t("messages.analyticsCleaned", {arg: response.data}));
            })
            .finally(() => {
                setCleanDate(undefined);
                setCleanPeriod(undefined);
                setCleaning(false);
            })
    }

    const handlePeriodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.value) {
            setCleanPeriod(e.currentTarget.dataset.value as "all" | "date");
        }
    }

    const handleDateChange = (value: Moment | string) => {
        setCleanDate(value);
    }

    if (!settings) {
        return <Row>
            <Col width={{"sm": 12}} className={`d-flex justify-content-center`}>
                <Spinner />
            </Col>
        </Row>
    }

    return <>
        <Row>
            <Col width={{"sm": 12, "lg": 9}}>
                <Card>
                    <CardHeader>
                        {t("eventsToListen")}
                    </CardHeader>

                    <CardBody>
                        <Row>
                            {
                                events.map(event => (<Col width={{sm: 12, lg: 4}} key={event}>
                                    <Checkbox
                                        checked={settings?.payload.events.includes(event)}
                                        label={t(`events.${event}`)}
                                        onChange={handleEventClick}
                                        name={event}
                                    />
                                </Col>))
                            }
                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        {t("analyticsDeleting")}
                    </CardHeader>

                    <CardBody className={`d-flex flex-wrap`}>
                        <div className="btn-group mr-4">
                            <button
                                className={`btn btn-${cleanPeriod === "all" ? "secondary" : "outline-secondary"}`}
                                onClick={handlePeriodClick}
                                data-value={`all`}
                            >
                                {t("buttons.cleanAll")}
                            </button>
                            <button
                                className={`btn btn-${cleanPeriod === "date" ? "secondary" : "outline-secondary"}`}
                                onClick={handlePeriodClick}
                                data-value={`date`}
                            >
                                {t("buttons.cleanToDate")}
                            </button>
                        </div>
                        {
                            cleanPeriod === "date" &&
                            <Datetime
                                value={cleanDate}
                                timeFormat={false}
                                locale="ru"
                                dateFormat="DD.MM.YYYY"
                                className={`mr-4`}
                                onChange={handleDateChange}
                            />
                        }
                        <Button
                            color={`danger`}
                            spinner={cleaning}
                            disabled={!cleanPeriod || (cleanPeriod === "date" && !cleanDate )}
                            onClick={handleCleanClick}
                        >
                            {t("buttons.clean")}
                        </Button>
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
                    settings?.updated_at &&
                    <Card>
                        <CardHeader>
                            {t("info")}
                        </CardHeader>

                        <CardBody>
                            <div className="d-flex">
                                <span className="mr-2 font-weight-bold">{t("updatedAt")}:</span>
                                <span>{moment(settings.updated_at).locale(locale).format('DD-MM-YY HH:mm')}</span>
                            </div>
                        </CardBody>
                    </Card>
                }
            </Col>
        </Row>
    </>
};

export default AnalyticsSettings;
