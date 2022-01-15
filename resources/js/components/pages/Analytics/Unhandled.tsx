import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import MainChart, {Period, Step} from "../../layout/Analytics/Charts/MainChart";
import moment, {Moment} from "moment";
import Card from "../../layout/Ui/Card/Card";
import CardBody from "../../layout/Ui/Card/CardBody";
import PeriodBar from "../../layout/Analytics/Charts/PeriodBar";
import TextInput from "../../inputs/TextInput";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import {DataGrid} from "../../layout/DataGrid";
import {useDebouncedEffect} from "../../../hooks/useDebounceEffect";

const Unhandled: FC = () => {
    const {t} = useTranslation();

    const [payload, setPayload] = useState("");

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const [queryParams, setQueryParams] = useState<{
        key: Period
        from?: Moment | string
        to?: Moment | string
        step?: Step
        payload?: string
    }>({
        key: "month",
        from: moment().startOf('month'),
        to: moment(),
        step: "day",
        payload: ""
    });

    useDebouncedEffect(() => {
        if (!payload && !queryParams.payload) return;

        setQueryParams({
            ...queryParams,
            payload: payload
        })
    }, 500, [payload])

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
        setPayload(e.target.value);
    }

    const handlePayloadResetClick = () => {
        setPayload("");
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
                        value={payload}
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
                resource="unhandled"
                type={`line`}
                period={queryParams.key}
                periodBar={false}
                from={queryParams.from}
                to={queryParams.to}
                step={queryParams.step}
                queryParams={queryParams}
                label={t("commands")}
            />
        </div>

        <Card>
            <CardHeader>{t("data")}</CardHeader>
            <CardBody>
                <DataGrid
                    resource={`analytics/unhandledTable`}
                    columns={[
                        {
                            key: "payload",
                            source: "payload",
                            label: t("value"),
                            sortable: true,
                        },
                        {
                            key: "count",
                            source: "count",
                            label: t("amount"),
                            sortable: true,
                        },
                    ]}
                    queryParams={queryParams}
                    disableBulkActions={true}
                    disableActions={true}
                    keyProp={`payload`}
                    className={`table-hover`}
                    fixedColumns={true}
                />
            </CardBody>
        </Card>
    </div>
};

export default Unhandled;
