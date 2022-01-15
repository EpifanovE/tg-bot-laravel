import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import MainChart, {Period, Step} from "../../layout/Analytics/Charts/MainChart";
import moment, {Moment} from "moment";
import Card from "../../layout/Ui/Card/Card";
import CardBody from "../../layout/Ui/Card/CardBody";
import PeriodBar from "../../layout/Analytics/Charts/PeriodBar";

const UniqueUsages: FC = () => {
    const {t} = useTranslation();

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const [queryParams, setQueryParams] = useState<{
        key: Period
        from?: Moment | string
        to?: Moment | string
        step?: Step
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
            </CardBody>
        </Card>

        <div>
            <MainChart
                resource="uniqueUsages"
                type={`line`}
                period={queryParams.key}
                periodBar={false}
                from={queryParams.from}
                to={queryParams.to}
                step={queryParams.step}
                queryParams={queryParams}
                label={t("uniqueUsages")}
            />
        </div>
    </div>
};

export default UniqueUsages;
