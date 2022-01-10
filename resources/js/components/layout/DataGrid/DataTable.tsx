import React, {FC} from "react";

import TableItem from "./TableItem";
import Checkbox from "../../inputs/Checkbox";
import DummyRow from "./DummyRow";
import {IDataTableProps} from "./types";
import SortableTitle from "./SortableTitle";

const DataTable: FC<IDataTableProps> = (props) => {

    const {
        columns, items, perPage, actions, onActionClick, deletingItems, resource,
        checkedItems,
        onCheckItemClick,
        onCheckAllClick, sortable, sortDirection, onChangeSortable, size, loading
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

    headEls.unshift(<th key="check">
        <Checkbox
            checked={!!checkedItems.length && checkedItems.length === items?.length}
            onChange={onCheckAllClick}
            className="d-inline"
        />
    </th>);

    headEls.push(<th key="actions"/>);

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
            return Array.from(Array(perPage).keys())
                .map(item => <DummyRow key={item} columns={columns} checkbox={true} actions={true}/>)
        }

        if (!items) {
            return;
        }

        const getProps = (item) => ({
            key: item.id,
            resource: resource,
            item: item,
            columns: columns,
            actions: actions,
            onActionClick: handleActionClick,
            onCheckItemClick: handleCheckClick,
            checked: checkedItems.includes(item.id),
            deleting: deletingItems.includes(item.id),
            size: size,
        });

        return items.map(item => <TableItem {...getProps(item)} />);
    };

    return <table className={`table${size ? " table-" + size : ""}`}>
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
