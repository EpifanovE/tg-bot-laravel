import React, {FC, useEffect, useState} from "react";

import ApiProvider from "../../../api/apiProvider";
import {IGetManyRequest, IGetManyResponse} from "../../../types/api";
import DataTable from "./DataTable";
import {Pagination} from "./index";
import {IDataGridProps, IFilterData} from "./types";
import {DELETE_ACTION, EDIT_ACTION, SORT_ASC, SORT_DESC} from "./constants";
import Filters from "./Filters";
import PerPage from "./PerPage";
import {useTranslation} from "react-i18next";
import BulkActions, {BULK_DELETE_ACTION} from "./BulkActions";
import {useDebouncedEffect} from "../../../hooks/useDebounceEffect";

export const DEFAULT_PER_PAGE = "25";

const DataGrid: FC<IDataGridProps> = (props) => {

    const {resource, columns, actions, filters, size, sortableSource, defaultSortColumn, defaultSortDirection,
        queryParams, disableBulkActions, disableActions, keyProp, className, fixedColumns} = props;

    const {t} = useTranslation();

    const [responseData, setResponseData] = useState<IGetManyResponse<any>>({});
    const [requestData, setRequestData] = useState<IGetManyRequest>({});
    const [deletingItems, setDeletingItems] = useState<Array<number>>([]);
    const [checkedItems, setCheckedItems] = useState<Array<number>>([]);
    const [sortable, setSortable] = useState<string>();
    const [sortDirection, setSortDirection] = useState<string>(SORT_DESC);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<boolean>(false);

    const {page = 1, perPage = DEFAULT_PER_PAGE, filter = {}} = requestData;
    const {data: items = [], meta} = responseData;

    useEffect(() => {
        if (defaultSortColumn) {
            setSortable(defaultSortColumn);
            setSortDirection(defaultSortDirection ? defaultSortDirection : SORT_ASC);
        }
    }, [defaultSortColumn]);

    useDebouncedEffect(() => {
        fetchItems()
    }, 500, [requestData, queryParams])

    useEffect(() => {
        if (sortable) {
            setRequestData({
                ...requestData,
                sort: [sortable, sortDirection]
            });
        }
    }, [sortable, sortDirection]);

    const fetchItems = () => {
        if (loading) return;

        setLoading(true);

        setCheckedItems([]);

        ApiProvider
            .getMany<IGetManyResponse<any>>(resource , {...requestData, ...queryParams, perPage: parseInt(requestData.perPage || DEFAULT_PER_PAGE)})
            .then(response => {
                if (response?.data) {
                    setResponseData(response.data);
                }
            })
            .catch(e => {
                setLoadingError(true);
            })
            .finally(() => {
                setLoading(false);
            })

    };

    const deleteItem = (id: number) => {

        if (deletingItems.includes(id)) {
            return;
        }

        setDeletingItems([
            ...deletingItems,
            id
        ]);

        ApiProvider.delete(resource, id)
            .then(response => {
                fetchItems();
            })
            .finally(() => {
                setDeletingItems(deletingItems.filter(item => item !== id))
            })
    };

    const deleteItems = () => {

        setDeletingItems([
            ...deletingItems,
            ...checkedItems,
        ]);

        ApiProvider
            .deleteMany(resource, checkedItems)
            .then(response => {
                fetchItems();
            })
            .finally(() => {
                setDeletingItems([]);
            });
    };

    const handlePageClick = (page: number) => {
        setRequestData({
            ...requestData,
            page: page
        })
    };

    const handleActionClick = (id: number, actionName: string) => {
        switch (actionName) {
            case DELETE_ACTION :
                if (confirm(t("messages.deleteConfirm"))) {
                    deleteItem(id);
                }
                break;
        }
    };

    const handleCheck = (id: number) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter(item => item !== id));
        } else {
            setCheckedItems([
                ...checkedItems,
                id
            ])
        }
    };

    const handleCheckAll = () => {

        if (items.length !== checkedItems.length) {
            setCheckedItems(items.map(item => item.id))
        } else {
            setCheckedItems([])
        }
    };

    const handleChangeSortable = (source: string) => {

        if (sortable !== source) {
            setSortDirection(SORT_DESC)
        } else if (sortDirection === SORT_DESC) {
            setSortDirection(SORT_ASC)
        } else {
            setSortDirection(SORT_DESC)
        }

        setSortable(source);
    };

    const handleChangeFilter = ({source, value}: IFilterData) => {

        setRequestData({
            ...requestData,
            filter: {
                ...requestData.filter,
                [source] : value
            }
        })
    };

    const handleChangePerPage = (perPage: string) => {
        setRequestData({
            ...requestData,
            perPage: perPage
        })
    };

    const handleBulkActionChange = (actionName: string) => {
        if (!actionName) {
            return;
        }

        switch (actionName) {
            case BULK_DELETE_ACTION :
                if (confirm(t("messages.deleteConfirm"))) {
                    deleteItems();
                }
                break;
        }
    };

    if (loadingError) {
        return <></>
    }

    return <div className="DataGrid">
        {
            (!!filters && !!filters.length) &&
            <Filters
                filters={filters}
                onChange={handleChangeFilter}
                values={filter}
                size={size}
            />
        }
        <div className="position-relative">
            <DataTable
                columns={columns}
                items={items}
                perPage={perPage}
                actions={actions}
                onActionClick={handleActionClick}
                deletingItems={deletingItems}
                resource={resource}
                checkedItems={checkedItems}
                onCheckItemClick={handleCheck}
                onCheckAllClick={handleCheckAll}
                sortable={sortable}
                sortDirection={sortDirection}
                onChangeSortable={handleChangeSortable}
                size={size}
                loading={loading}
                disableBulkActions={disableBulkActions}
                disableActions={disableActions}
                keyProp={keyProp}
                className={className}
                fixedColumns={fixedColumns}
            />
            {
                loading &&
                    <div className="Overlay"/>
            }
        </div>
        {
            !!checkedItems.length &&
            <div className="row">
                <div className="col-12 d-flex">
                    <BulkActions onSelect={handleBulkActionChange}/>
                </div>
            </div>
        }
        <div className="row">
            <div className="col-12 col-lg-6">
            {
                meta?.last_page && meta.last_page > 1 &&
                <Pagination
                    current={page}
                    lastPage={meta.last_page}
                    onClick={handlePageClick}
                    size={size}
                />
            }
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-end">
                <PerPage
                    onChange={handleChangePerPage}
                    choices={{10: "10", 25: "25", 50: "50"}}
                    value={perPage}
                    size={size}
                    label={t("perPage")}
                />
            </div>
        </div>
    </div>
};

export default DataGrid;
