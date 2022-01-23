import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import Chart from "../../layout/Analytics/Charts/Chart";
import Card from "../../layout/Ui/Card/Card";
import CardBody from "../../layout/Ui/Card/CardBody";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Filters from "../../layout/IndexGrid/Filters";
import PeriodFilter from "../../layout/IndexGrid/filters/PeriodFilter";
import TextFilter from "../../layout/IndexGrid/filters/TextFilter";
import useIndexGridProps from "../../layout/IndexGrid/useIndexGridProps";
import {IndexGrid} from "../../layout/IndexGrid";

const NewSubscribers: FC = () => {
    const {t} = useTranslation();

    const {disallow, messageComponent} = useAccess(["analytics.view"]);

    const {
        page,
        perPage,
        sort,
        filter,
        setPage,
        setPerPage,
        setSort,
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
                        <TextFilter source={`payload`} value={filter?.payload} label={t("eventPayload")} />
                    ]}
                    onChange={setFilter}
                    values={filter}
                />
            </Col>
        </Row>

        <div>
            <Chart
                resource="newSubscribers"
                type={`line`}
                label={t("commands")}
                filter={filter}
            />
        </div>

        <Card>
            <CardHeader>{t("data")}</CardHeader>
            <CardBody>
                <IndexGrid
                    resource={`analytics/newSubscribersTable`}
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
                    page={page}
                    perPage={perPage}
                    disableActions={true}
                    keyProp={`payload`}
                    className={`table-hover`}
                    fixedColumns={true}
                    sort={sort}
                    filter={filter}
                    onChangePage={setPage}
                    onChangePerPage={setPerPage}
                    onChangeSort={setSort}
                />
            </CardBody>
        </Card>

    </div>
}

export default NewSubscribers;
