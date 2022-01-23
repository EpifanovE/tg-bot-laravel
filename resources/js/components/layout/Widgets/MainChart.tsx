import React, {FC, useState} from "react";
import Chart, {Period} from "../Analytics/Charts/Chart";
import {useTranslation} from "react-i18next";
import PeriodInput from "../../inputs/PeriodInput";
import {IPeriodValue} from "../IndexGrid/types";

const MainChart: FC = () => {

    const {t} = useTranslation();

    const [value, setValue] = useState<IPeriodValue>({key: "month"})

    return <Chart
            resource="newSubscribers"
            type={`line`}
            title={t('newSubscribers')}
            label={t("newSubscribers")}
            filter={{period: value}}
            filterBar={<PeriodInput
                value={value}
                onChange={setValue}
            />}
        />
}

export default MainChart;
