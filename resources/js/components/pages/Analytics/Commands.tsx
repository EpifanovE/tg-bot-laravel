import React, {FC,} from "react";
import {useTranslation} from "react-i18next";
import useAccess from "../../../hooks/useAccess";
import Chart from "../../layout/Analytics/Charts/Chart";
import Card from "../../layout/Ui/Card/Card";
import CardBody from "../../layout/Ui/Card/CardBody";
import CardHeader from "../../layout/Ui/Card/CardHeader";
import useIndexGridProps from "../../layout/IndexGrid/useIndexGridProps";
import Row from "../../layout/Ui/Row";
import Col from "../../layout/Ui/Col";
import Filters from "../../layout/IndexGrid/Filters";
import PeriodFilter from "../../layout/IndexGrid/filters/PeriodFilter";
import {IndexGrid} from "../../layout/IndexGrid";
import TextFilter from "../../layout/IndexGrid/filters/TextFilter";

const Commands: FC = () => {
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
                        <TextFilter source={`code`} value={filter?.code} label={t("code")} />
                    ]}
                    onChange={setFilter}
                    values={filter}
                />
            </Col>
        </Row>

        <div>
            <Chart
                resource="commands"
                type={`line`}
                label={t("commands")}
                filter={filter}
            />
        </div>

        <Card>
            <CardHeader>{t("data")}</CardHeader>
            <CardBody>
                <IndexGrid
                    resource={`analytics/commandsTable`}
                    columns={[
                        {
                            key: "name",
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
                            key: "code",
                            source: "code",
                            label: t("code"),
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
                    keyProp={`code`}
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

export default Commands;
