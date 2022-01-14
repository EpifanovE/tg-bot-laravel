import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import MainChart, {Period, Step} from "../../layout/Analytics/Charts/MainChart";
import PeriodBar from "../../layout/Analytics/Charts/PeriodBar";
import {Moment} from "moment";
import Card from "../../layout/Ui/Card/Card";
import CardBody from "../../layout/Ui/Card/CardBody";
import TextInput from "../../inputs/TextInput";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import Table from "../../layout/Analytics/Table/Table";

const NewSubscribers: FC = () => {
    const {t} = useTranslation();

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const [queryParams, setQueryParams] = useState<{
        key: Period
        from?: Moment | string
        to?: Moment | string
        step?: Step
        payload?: string
    }>({
        key: "month"
    });

    if (disallow) {
        return messageComponent;
    }

    const handlePeriodChange = (value: Period) => {
        setQueryParams({
            ...queryParams,
            key: value
        });
    }

    const handleFromChange = (value: Moment | string) => {
        setQueryParams({
            ...queryParams,
            from: value
        })
    }

    const handleToChange = (value: Moment | string) => {
        setQueryParams({
            ...queryParams,
            to: value
        })
    }

    const handleStepChange = (value: Array<string>) => {
        setQueryParams({
            ...queryParams,
            step: value[0] as Step
        })
    }

    const handlePayloadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryParams({
            ...queryParams,
            payload: e.target.value
        })
    }

    const handlePayloadResetClick = () => {
        setQueryParams({
            ...queryParams,
            payload: ""
        })
    }

    return <div>

        <Card>
            <CardBody className={`d-flex align-items-start`}>
                <PeriodBar
                    value={queryParams.key}
                    onChange={handlePeriodChange}
                    from={queryParams.from}
                    to={queryParams.to}
                    step={queryParams.step}
                    onFromChange={handleFromChange}
                    onToChange={handleToChange}
                    onStepChange={handleStepChange}
                    className={`mr-4`}
                />
                <div>
                    <TextInput
                        value={queryParams.payload || ""}
                        onChange={handlePayloadChange}
                        placeholder={t("eventPayload")}
                        resettable={true}
                        onResetClick={handlePayloadResetClick}
                        className={`mb-0`}
                    />
                </div>
            </CardBody>
        </Card>

        <div>
            <MainChart
                resource="newSubscribers"
                type={`line`}
                period={queryParams.key}
                periodBar={false}
                from={queryParams.from}
                to={queryParams.to}
                step={queryParams.step}
                queryParams={queryParams}
            />
        </div>

        <Card>
            <CardHeader>{t("data")}</CardHeader>
            <CardBody>
                <Table
                    resource={`analytics/newSubscribersTable`}
                    columns={[
                        {
                            source: "payload",
                            label: t("eventPayload"),
                            sortable: true,
                        },
                        {
                            source: "count",
                            label: t("amount"),
                            sortable: true,
                        },
                    ]}
                    queryParams={queryParams}
                />
            </CardBody>
        </Card>

    </div>
}

export default NewSubscribers;
