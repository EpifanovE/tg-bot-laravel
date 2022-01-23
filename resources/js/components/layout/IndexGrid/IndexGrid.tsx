import React, {FC, useEffect, useState} from "react";

import {IGetManyResponse} from "../../../types/api";
import DataTable from "./DataTable";
import {Pagination} from "./index";
import {IDataGridProps} from "./types";
import {DEFAULT_PAGE, DEFAULT_PER_PAGE, DELETE_ACTION, SORT_ASC, SORT_DESC} from "./constants";
import PerPage from "./PerPage";
import {useTranslation} from "react-i18next";
import BulkActions, {BULK_DELETE_ACTION} from "./BulkActions";
import {useDebouncedEffect} from "../../../hooks/useDebounceEffect";
import {useApi} from "../../../hooks/useApi";

const IndexGrid: FC<IDataGridProps> = (props) => {

    const {
        resource,
        columns,
        actions,
        size,
        queryParams,
        keyProp,
        className,
        fixedColumns,
        page,
        onChangePage,
        perPage,
        onChangePerPage,
        sort,
        onChangeSort,
        filter,
        bulkActions,
        disableActions,
    } = props;

    const {t} = useTranslation();
    const api = useApi();

    const [responseData, setResponseData] = useState<IGetManyResponse<any>>({});
    const [deletingItems, setDeletingItems] = useState<Array<number>>([]);
    const [checkedItems, setCheckedItems] = useState<Array<number>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<boolean>(false);

    const {data: items = [], meta} = responseData;

    useEffect(() => {
        fetchItems()
    }, [perPage, sort, page, filter, queryParams]);

    const fetchItems = () => {
        if (loading) return;

        setLoading(true);

        setCheckedItems([]);

        api
            .getMany<IGetManyResponse<any>>(resource, {
                ...queryParams,
                page: parseInt(page || DEFAULT_PAGE),
                perPage: parseInt(perPage || DEFAULT_PER_PAGE),
                sort: sort || undefined,
                filter: filter || undefined
            })
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

        api
            .delete(resource, id)
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

        api
            .deleteMany(resource, checkedItems)
            .then(response => {
                fetchItems();
            })
            .finally(() => {
                setDeletingItems([]);
            });
    };

    const handlePageClick = (page: number) => {
        if (onChangePage) {
            onChangePage(page.toString());
        }
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

        if (!onChangeSort) return;

        if (sort?.field !== source) {
            onChangeSort({field: source, order: SORT_DESC})
        } else if (sort?.order === SORT_DESC) {
            onChangeSort({field: source, order: SORT_ASC})
        } else {
            onChangeSort({field: source, order: SORT_DESC})
        }
    };

    const handleChangePerPage = (perPage?: string) => {
        if (onChangePerPage) {
            onChangePerPage(perPage);
        }
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
        <div className="position-relative">
            <DataTable
                columns={columns}
                items={items}
                perPage={perPage || DEFAULT_PER_PAGE}
                actions={actions}
                onActionClick={handleActionClick}
                deletingItems={deletingItems}
                resource={resource}
                checkedItems={checkedItems}
                onCheckItemClick={handleCheck}
                onCheckAllClick={handleCheckAll}
                sortable={sort?.field}
                sortDirection={sort?.order}
                onChangeSortable={handleChangeSortable}
                size={size}
                loading={loading}
                keyProp={keyProp}
                className={className}
                fixedColumns={fixedColumns}
                bulkActions={bulkActions}
                disableActions={disableActions}
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
                    <BulkActions onSelect={handleBulkActionChange} actions={bulkActions}/>
                </div>
            </div>
        }
        <div className="row">
            <div className="col-12 col-lg-6">
                {
                    meta?.last_page && meta.last_page > 1 &&
                    <Pagination
                        current={parseInt(page || DEFAULT_PAGE)}
                        lastPage={meta.last_page}
                        onClick={handlePageClick}
                        size={size}
                        disabled={loading}
                    />
                }
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-end">
                <PerPage
                    onChange={handleChangePerPage}
                    choices={{10: "10", 25: "25", 50: "50"}}
                    value={perPage || ""}
                    size={size}
                    label={t("perPage")}
                    disabled={loading}
                />
            </div>
        </div>
    </div>
};

export default IndexGrid;
