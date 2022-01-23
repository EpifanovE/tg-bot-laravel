import React, {FC, } from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import Chart, {Period, Step} from "../../layout/Analytics/Charts/Chart";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Filters from "../../layout/IndexGrid/Filters";
import PeriodFilter from "../../layout/IndexGrid/filters/PeriodFilter";
import useIndexGridProps from "../../layout/IndexGrid/useIndexGridProps";

const UniqueUsages: FC = () => {
    const {t} = useTranslation();

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const {
        filter,
        setFilter,
    } = useIndexGridProps({
        filter: {
            period: {
                key: "month"
            }
        }
    });

    if (disallow) {
        return messageComponent;
    }

    return <div>

        <Row>
            <Col width={{"sm": 12}}>
                <Filters
                    filters={[
                        <PeriodFilter source={`period`} value={filter?.period} width={{sm: 12}} />,
                    ]}
                    onChange={setFilter}
                    values={filter}
                />
            </Col>
        </Row>

        <div>
            <Chart
                resource="uniqueUsages"
                type={`line`}
                label={t("uniqueUsages")}
                filter={filter}
            />
        </div>
    </div>
};

export default UniqueUsages;
