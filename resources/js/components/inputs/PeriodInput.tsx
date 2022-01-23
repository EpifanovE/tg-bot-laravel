import React, {FC, useEffect} from "react";
import Datetime from "react-datetime";
import SelectInput from "./SelectInput";
import {IPeriodValue} from "../layout/IndexGrid/types";
import {useTranslation} from "react-i18next";
import {Period} from "../layout/Analytics/Charts/Chart";
import {Moment} from "moment";
import "react-datetime/css/react-datetime.css";

interface IPeriodInputProps {
    value: IPeriodValue
    onChange: (value: IPeriodValue) => void
    className?: string
}

const PeriodInput: FC<IPeriodInputProps> = (props) => {

    const {
        value,
        onChange,
        className,
    } = props;

    const {t} = useTranslation();

    const getButtonClass = (periodKey: string) => {
        return `btn ${periodKey === value?.key ? 'btn btn-secondary' : 'btn-outline-secondary'}`
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.value && onChange) {
            onChange({
                ...value,
                key: e.currentTarget.dataset.value as Period
            })
        }
    }

    const handleFromChange = (data: Moment | string) => {
        if (!onChange) return;

        onChange({
            ...value,
            from: data.toString()
        })
    }

    const handleToChange = (data: Moment | string) => {
        if (!onChange) return;

        onChange({
            ...value,
            to: data.toString()
        })
    }

    const handleStepChange = (data: Array<string>) => {
        if (!onChange) return;

        onChange({
            ...value,
            step: data[0]
        })
    }

    return <div className={`d-flex flex-wrap${className ? ' ' + className : ''}`}>
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className={`${getButtonClass('week')} mb-3`} data-value={`week`}
                    onClick={handleClick}>{t("week")}</button>
            <button type="button" className={`${getButtonClass('month')} mb-3`} data-value={`month`}
                    onClick={handleClick}>{t("month")}</button>
            <button type="button" className={`${getButtonClass('year')} mb-3`} data-value={`year`}
                    onClick={handleClick}>{t("year")}</button>
            <button type="button" className={`${getButtonClass('customPeriod')} mb-3`} data-value={`customPeriod`}
                    onClick={handleClick}>{t("customPeriod")}</button>
        </div>
        {
            value?.key === "customPeriod" &&
            <div className={`d-flex align-items-center ml-lg-4`}>

                <Datetime
                    value={value.from}
                    timeFormat={false}
                    locale="ru"
                    dateFormat="DD.MM.YYYY"
                    className={`mr-2 mb-3`}
                    onChange={handleFromChange}
                />

                <span className={`mr-2`}>-</span>

                <Datetime
                    value={value.to}
                    timeFormat={false}
                    locale="ru"
                    dateFormat="DD.MM.YYYY"
                    onChange={handleToChange}
                    className={`mr-2 mb-3`}
                />

                <SelectInput
                    value={[value.step || "day"]}
                    onChange={handleStepChange}
                    choices={{
                        day: t("day"),
                        month: t("month")
                    }}
                    className={`mb-0 mb-3`}
                />
            </div>
        }
    </div>
}

export default PeriodInput;
