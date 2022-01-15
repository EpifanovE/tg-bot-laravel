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
import Table from "../../layout/Analytics/Table/Table";

const Commands: FC = () => {
    const {t} = useTranslation();

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const [queryParams, setQueryParams] = useState<{
        key: Period
        from?: Moment | string
        to?: Moment | string
        step?: Step
        code?: string
    }>({
        key: "month",
        from: moment().startOf('month'),
        to: moment(),
        step: "day"
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

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryParams({
            ...queryParams,
            code: e.target.value
        })
    }

    const handleCodeResetClick = () => {
        setQueryParams({
            ...queryParams,
            code: ""
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
                        value={queryParams.code || ""}
                        onChange={handleCodeChange}
                        placeholder={t("code")}
                        resettable={true}
                        onResetClick={handleCodeResetClick}
                        className={`mb-0`}
                    />
                </div>
            </CardBody>
        </Card>

        <div>
            <MainChart
                resource="commands"
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
                <Table
                    resource={`analytics/commandsTable`}
                    columns={[
                        {
                            source: "label",
                            label: t("name"),
                            render: (item) => {
                                if (!!item.label) {
                                    return item.label
                                }

                                return item.code;
                            }
                        },
                        {
                            source: "code",
                            label: t("code"),
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

export default Commands;
