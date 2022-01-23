import React, {FC} from "react";

import TableItem from "./TableItem";
import Checkbox from "../../inputs/Checkbox";
import {IDataTableProps} from "./types";
import SortableTitle from "./SortableTitle";

const DataTable: FC<IDataTableProps> = (props) => {

    const {
        columns,
        items,
        actions,
        onActionClick,
        deletingItems,
        resource,
        checkedItems,
        onCheckItemClick,
        onCheckAllClick,
        sortable,
        sortDirection,
        onChangeSortable,
        size,
        disableActions,
        keyProp,
        className,
        fixedColumns,
        bulkActions,
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

    if (bulkActions) {
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
            bulkActions,
        });

        return items.map(item => <TableItem {...getProps(item)} bulkActions={!!bulkActions} />);
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
