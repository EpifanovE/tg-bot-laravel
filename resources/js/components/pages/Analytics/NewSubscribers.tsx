import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import MainChart, {Period, Step} from "../../layout/Widgets/Charts/MainChart";
import PeriodBar from "../../layout/Widgets/Charts/PeriodBar";
import moment, {Moment} from "moment";
import Card from "../../layout/Ui/Card/Card";
import CardBody from "../../layout/Ui/Card/CardBody";

const NewSubscribers: FC = () => {
    const {t} = useTranslation();

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const [period, setPeriod] = useState<Period>("month");
    const [from, setFrom] = useState<Moment | string>(moment().startOf('month'));
    const [to, setTo] = useState<Moment | string>(moment());
    const [step, setStep] = useState<Step>("day");

    if (disallow) {
        return messageComponent;
    }

    const handlePeriodChange = (value: Period) => {
        setPeriod(value);
    }

    const handleFromChange = (value: Moment | string) => {
        setFrom(value);
    }

    const handleToChange = (value: Moment | string) => {
        setTo(value)
    }

    const handleStepChange = (value: Array<string>) => {
        setStep(value[0] as Step);
    }

    return <div>

        <Card>
            <CardBody>
                <PeriodBar
                    value={period}
                    onChange={handlePeriodChange}
                    from={from}
                    to={to}
                    step={step}
                    onFromChange={handleFromChange}
                    onToChange={handleToChange}
                    onStepChange={handleStepChange}
                />
            </CardBody>
        </Card>

        <div>
            <MainChart
                resource="newSubscribers"
                type={`line`}
                period={period}
                periodBar={false}
                from={from}
                to={to}
                step={step}
            />
        </div>

    </div>
}

export default NewSubscribers;
