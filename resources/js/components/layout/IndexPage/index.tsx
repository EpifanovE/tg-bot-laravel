import React, {FC, ReactElement, useEffect, useMemo, useState} from "react";
import {NavLink, useSearchParams, createSearchParams} from "react-router-dom";
import Row from "../Ui/Row";
import Col from "../Ui/Col";
import Icon from "../Icon";
import Card from "../Ui/Card/Card";
import CardHeader from "../Ui/Card/CardHeader";
import CardBody from "../Ui/Card/CardBody";
import {IndexGrid} from "../IndexGrid";
import {useTranslation} from "react-i18next";
import {IDataTableColumn} from "../IndexGrid/types";
import Filters from "../IndexGrid/Filters";
import {BULK_DELETE_ACTION} from "../IndexGrid/BulkActions";

interface IIndexPageProps {
    resource: string
    title: string
    columns: Array<IDataTableColumn>
    filters?: Array<ReactElement>
    actions?: (item: any) => ReactElement
    creating?: boolean
    disableActions?: boolean
}

const IndexPage: FC<IIndexPageProps> = (props) => {

    const {
        resource,
        title,
        columns,
        filters,
        actions,
        creating,
        disableActions,
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const {t} = useTranslation();

    const [query, setQuery] = useState<{[key: string]: string | null | undefined}>({});

    const sortObj = useMemo(() => {
        const sort = searchParams.get("sort");
        return sort ? JSON.parse(sort) : null;
    }, [searchParams]);

    const filterObj = useMemo(() => {
        const filter = searchParams.get("filter");
        return filter ? JSON.parse(filter) : null;
    }, [searchParams]);

    useEffect(() => {
        setQuery({
            ...query,
            page: searchParams.get("page"),
            perPage: searchParams.get("perPage"),
            sort: searchParams.get("sort"),
            filter: searchParams.get("filter")
        })

    }, []);

    useEffect(() => {

        let searchQuery = {};

        Object.entries(query).forEach(item => {
            if (item[1] && item[1] !== "{}") {
                searchQuery[item[0]] = item[1]
            }
        });


        setSearchParams(createSearchParams(searchQuery));
    }, [query]);

    const handleChangePage = (page: string) => {
        setQuery({
            ...query,
            page: page
        });
    }

    const handleChangePerPage = (perPage?: string) => {
        setQuery({
            ...query,
            perPage: perPage
        });
    }

    const handleChangeSort = (sort: { field: string, order: string }) => {
        setQuery({
            ...query,
            page: "1",
            sort: JSON.stringify(sort)
        })
    }

    const handleChangeFilter = (data: {[key: string] : string | number | Array<any> | {[key: string] : any} | null}) => {
        let filters = {};

        Object.entries(data).forEach(item => {
            // @ts-ignore
            if (item[1] && !!item[1].length) {
                filters[item[0]] = item[1]
            }
        });

        setQuery({
            ...query,
            page: "1",
            filter: JSON.stringify(filters),
        })
    }


    return <>
        {
            !!creating &&
            <Row>
                <Col width={{"sm": 12}} className="d-flex justify-content-end mb-4">
                    <NavLink className="btn btn-success d-flex align-items-center" to={`/${resource}/create`}>
                        <Icon name="plus" className="mr-2"/>
                        {t("buttons.create")}
                    </NavLink>
                </Col>
            </Row>
        }
        {
            (!!filters && !!filters.length) &&
                <Row>
                    <Col width={{"sm": 12}}>
                        <Filters
                            filters={filters}
                            onChange={handleChangeFilter}
                            values={filterObj}
                        />
                    </Col>
                </Row>
        }
        <Row>
            <Col width={{"sm": 12}}>
                <Card>
                    <CardHeader>
                        {title}
                    </CardHeader>
                    <CardBody>
                        <IndexGrid
                            resource={resource}
                            columns={columns}
                            actions={actions}
                            page={searchParams.get("page")}
                            perPage={searchParams.get("perPage")}
                            sort={sortObj}
                            filter={filterObj}
                            onChangePage={handleChangePage}
                            onChangePerPage={handleChangePerPage}
                            onChangeSort={handleChangeSort}
                            bulkActions={{
                                [BULK_DELETE_ACTION]: t("deleteAction"),
                            }}
                            disableActions={disableActions}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
};

export default IndexPage;
