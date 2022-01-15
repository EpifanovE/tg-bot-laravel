import React, {FC} from "react";

import TableItem from "./TableItem";
import Checkbox from "../../inputs/Checkbox";
import DummyRow from "./DummyRow";
import {IDataTableProps} from "./types";
import SortableTitle from "./SortableTitle";
import {DEFAULT_PER_PAGE} from "./DataGrid";

const DataTable: FC<IDataTableProps> = (props) => {

    const {
        columns, items, perPage, actions, onActionClick, deletingItems, resource,
        checkedItems,
        onCheckItemClick,
        onCheckAllClick, sortable, sortDirection, onChangeSortable, size, loading, disableBulkActions, disableActions,
        keyProp, className, fixedColumns
    } = props;

    const handleSortClick = (source: string) => {
        if (onChangeSortable) {
            onChangeSortable(source);
        }
    };

    const headEls = columns.map(column => <th key={column.key}>
        {
            column.sortable ?
                <SortableTitle
                    active={sortable === column.source}
                    onClick={handleSortClick}
                    label={column.label}
                    direction={sortDirection}
                    source={column.source}
                />
                : column.label
        }
    </th>);

    if (!disableBulkActions) {
        headEls.unshift(<th key="check">
            <Checkbox
                checked={!!checkedItems.length && checkedItems.length === items?.length}
                onChange={onCheckAllClick}
                className="d-inline"
            />
        </th>);
    }

    if (!disableActions) {
        headEls.push(<th key="actions"/>);
    }

    const handleActionClick = (id: number, actionName: string) => {
        if (onActionClick) {
            onActionClick(id, actionName);
        }
    };

    const handleCheckClick = (id: number) => {
        onCheckItemClick(id);
    };

    const getItemsEls = () => {
        if (loading) {
            return Array.from(Array(parseInt(perPage || DEFAULT_PER_PAGE)).keys())
                .map(item => <DummyRow key={item} columns={columns} checkbox={!disableBulkActions} actions={!disableActions}/>)
        }

        if (!items) {
            return;
        }

        const getProps = (item) => ({
            key: item[keyProp ?? "id"],
            resource: resource,
            item: item,
            columns: columns,
            actions: actions,
            onActionClick: handleActionClick,
            onCheckItemClick: handleCheckClick,
            checked: checkedItems.includes(item.id),
            deleting: deletingItems.includes(item.id),
            size: size,
            disableActions,
            disableBulkActions
        });

        return items.map(item => <TableItem {...getProps(item)} />);
    };

    return <table className={`table${size ? " table-" + size : ""}${className ? " " + className : ""}`} style={fixedColumns ? {tableLayout:"fixed"} : {}}>
        <thead>
        <tr>
            {headEls}
        </tr>
        </thead>
        <tbody>
            {getItemsEls()}
        </tbody>

    </table>
};

export default DataTable;
