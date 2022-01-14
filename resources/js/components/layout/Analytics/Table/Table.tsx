import React, {FC, ReactNode, useEffect, useState} from "react";
import {stringify} from "query-string";
import {useApi} from "../../../../hooks/useApi";
import {useTranslation} from "react-i18next";
import SortableTitle from "../../DataGrid/SortableTitle";

interface ITableProps {
    resource: string
    columns: Array<{
        label?: string
        source: string
        render?: (item: any) => ReactNode
        sortable?: boolean
    }>
    queryParams?: Record<string, any>
}

export type SortDirection = "asc" | "desc";

const Table: FC<ITableProps> = ({resource, columns, queryParams}) => {

    const api = useApi();
    const {t} = useTranslation();

    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    const [sortBy, setSortBy] = useState<string>();
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    useEffect(() => {

        if (loading) return;

        setLoading(true);

        let queryObject = {};

        if (!!queryParams) {
            queryObject = queryParams;
        }

        if (!!sortBy) {
            queryObject = {
                ...queryObject,
                sortBy,
                sortDirection
            }
        }

        const paramsQueryStr = !!queryObject ? "?" + stringify(queryObject) : "";

        api
            .request<Array<any>>({
                endpoint: `${resource}${paramsQueryStr}`,
                method: "get",
            })
            .then(response => {
                setTableData(response.data)
            })
            .finally(() => {
                setLoading(false);
            });

    }, [queryParams, sortBy, sortDirection])

    const handleSortClick = (source: string) => {
        if (sortBy !== source) {
            setSortDirection("desc")
        } else if (sortDirection === "desc") {
            setSortDirection("asc")
        } else {
            setSortDirection("desc")
        }

        setSortBy(source);
    }

    return <table className={`table table-hover`} style={{tableLayout:"fixed"}}>
        <thead>
        <tr>
            {
                columns.map(column => {
                    return <th key={column.source}>
                        {
                            column.sortable ?
                                <SortableTitle
                                    active={sortBy === column.source}
                                    onClick={handleSortClick}
                                    label={column.label}
                                    direction={sortDirection}
                                    source={column.source}
                                />
                                : column.label
                        }
                    </th>
                })
            }
        </tr>
        </thead>
        <tbody>
        {
            tableData.map((item, index) => {
                return <tr key={index}>
                    {
                        columns.map(column => {
                            if (!!column.render) {
                                return <td key={column.source}>{column.render(item)}</td>
                            }

                            if (!!column.source) {
                                return <td key={column.source}>{item[column.source]}</td>
                            }

                            return <td key={column.source}/>
                        })
                    }
                </tr>
            })
        }
        </tbody>
    </table>
};

export default Table;
