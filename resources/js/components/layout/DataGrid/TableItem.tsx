import React, {FC} from "react";
import {SortableHandle} from "react-sortable-hoc";
import {TextColumn} from "./index";
import EditAction from "./EditAction";
import DeleteAction from "./DeleteAction";
import Checkbox from "../../inputs/Checkbox";
import {ITableItemProps} from "./types";
import {DELETE_ACTION, EDIT_ACTION} from "./constants";
import {useTranslation} from "react-i18next";

const TableItem: FC<ITableItemProps> = (props) => {

    const {resource, item, columns, actions, onActionClick, onCheckItemClick, checked, deleting, size, displaySortable, disableActions, disableBulkActions} = props;

    const handleCheckClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckItemClick(parseInt(e.target.value));
    };

    const rowEls = columns.map((column) => {
        const Component = column.component ? column.component : TextColumn;

        if (column.render) {
            return <td key={column.key} className="align-middle">{column.render(item)}</td>;
        }

        if (column.source) {
            const getValue = () => {
                if (item[column.source]) {
                    return item[column.source];
                }

                if (column.default) {
                    return column.default;
                }

                return ""
            };

            return <Component key={column.key} value={getValue()}/>
        }

        return <></>
    });

    if (!disableActions) {
        if (actions && typeof actions === "function") {
            rowEls.push(<td key="actions" className="align-middle"><span className="d-flex">
                {actions(item)}
            </span></td>);
        } else {
            rowEls.push(<td key="actions" className="align-middle"><span className="d-flex">
                        <EditAction id={item.id} resource={resource} size={size}/>
                        <DeleteAction
                            id={item.id}
                            onClick={onActionClick}
                            isDeleting={deleting}
                            size={size}
                        />
                </span></td>);
        }
    }

    const RowHandler = SortableHandle(() => <td className="align-middle"><span className="MoveButton">
        <i className="cil-options MoveButton__Icon"/>
    </span></td>);

    if (displaySortable) {
        rowEls.push(<RowHandler key="sort"/>);
    }

    if (!disableBulkActions) {
        rowEls.unshift(<td className="align-middle" key="check">
            <Checkbox
                value={`${item.id}`}
                checked={checked}
                onChange={handleCheckClick}
                className="d-inline"
            />
        </td>);
    }

    return <tr key={item.id}>
        {rowEls}
    </tr>
};

export default TableItem
