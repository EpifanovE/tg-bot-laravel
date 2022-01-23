import React, {FC, useEffect} from "react";
import {useTranslation} from "react-i18next";
import Datetime from 'react-datetime';

import {Moment} from "moment";
import SelectInput from "../../../inputs/SelectInput";
import {Period} from "./Chart";

interface IPeriodBarProps {
    value: string
    onChange: (value: Period) => void
    className?: string
    from?: Moment | string
    to?: Moment | string
    step?: string
    onFromChange: (value: Moment | string) => void
    onToChange: (value: Moment | string) => void
    onStepChange: (value: Array<string>) => void
}

const PeriodBar: FC<IPeriodBarProps> = ({
                                            value, onChange, from, to,
                                            step, onFromChange, onToChange, onStepChange,
                                            className
                                        }) => {

    const {t} = useTranslation();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.value) {
            onChange(e.currentTarget.dataset.value as Period)
        }
    }

    const getButtonClass = (periodKey: string) => {
        return `btn ${periodKey === value ? 'btn btn-secondary' : 'btn-outline-secondary'}`
    }

    return <div className={`d-flex${className ? ' ' + className : ''}`}>
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className={`${getButtonClass('week')}`} data-value={`week`}
                    onClick={handleClick}>{t("week")}</button>
            <button type="button" className={`${getButtonClass('month')}`} data-value={`month`}
                    onClick={handleClick}>{t("month")}</button>
            <button type="button" className={`${getButtonClass('year')}`} data-value={`year`}
                    onClick={handleClick}>{t("year")}</button>
            <button type="button" className={`${getButtonClass('customPeriod')}`} data-value={`customPeriod`}
                    onClick={handleClick}>{t("customPeriod")}</button>
        </div>
        {
            value === "customPeriod" &&
            <div className={`d-flex align-items-center ml-4`}>

                <Datetime
                    value={from}
                    timeFormat={false}
                    locale="ru"
                    dateFormat="DD.MM.YYYY"
                    className={`mr-2`}
                    onChange={onFromChange}
                />

                <span className={`mr-2`}>-</span>

                <Datetime
                    value={to}
                    timeFormat={false}
                    locale="ru"
                    dateFormat="DD.MM.YYYY"
                    onChange={onToChange}
                    className={`mr-2`}
                />

                <SelectInput
                    value={[step || "day"]}
                    onChange={onStepChange}
                    choices={{
                        day: t("day"),
                        month: t("month")
                    }}
                    className={`mb-0`}
                />
            </div>
        }
    </div>
}

export default PeriodBar;
