import {FC, HTMLAttributes, ReactElement, ReactNode} from "react";
import {IColProps} from "../Ui/Col";
import {InputChoices} from "../../inputs/types";
import {Size} from "../../../types/app";

export interface IDataGridProps extends HTMLAttributes<HTMLDivElement>{
    resource: string
    columns: Array<IDataTableColumn>
    actions?: (item: any) => ReactElement
    filters?: Array<ReactElement>
    size?: Size
    sortableSource?: string
    defaultSortColumn?: string
    defaultSortDirection?: string;
}

export interface IActionProps {
    id: number
    size?: Size
}

export interface IDeleteActionProps extends IActionProps{
    isDeleting: boolean
    onClick: (id: number, actionName: string) => void
}

export interface IDataTableColumnProps {
    value: any
}

export interface IDataTableColumn {
    key: string
    label?: string
    source: string
    component?: FC<IDataTableColumnProps>
    render?: (item: any) => ReactNode
    sortable?: boolean
    default?: string
}

export interface IDataTableProps {
    items?: Array<any>
    columns: Array<IDataTableColumn>
    perPage: number
    actions?: (item: any) => ReactElement
    onActionClick?: (id: number, actionName: string) => void
    deletingItems: Array<number>
    resource: string
    checkedItems: Array<number>
    onCheckItemClick: (id: number) => void
    onCheckAllClick: () => void
    sortable? : string
    sortDirection? : string
    onChangeSortable?: (source: string) => void
    size?: Size
    sortableSource?: string
    loading: boolean
}

export interface IDummyRowProps {
    columns: Array<IDataTableColumn>
    actions?: boolean
    checkbox?: boolean
}

export interface IEditActionProps extends IActionProps {
    resource: string
}

export interface ITableItemProps {
    resource: string
    item: any
    columns: Array<IDataTableColumn>,
    actions?: (item: any) => ReactElement
    onActionClick: (id: number, actionName: string) => void
    onCheckItemClick: (id: number) => void
    checked: boolean
    deleting: boolean
    size?: Size
    displaySortable?: boolean
}

export interface ITextColumnProps extends IDataTableColumnProps {

}

export interface ISortableTitleProps {
    label?: string
    active: boolean
    direction?: string
    onClick: (source: string) => void
    source: string
}

export interface IFiltersProps {
    filters: Array<ReactElement>
    values?: any
    onChange: (data: IFilterData) => void
    size?: Size
}

export interface IFilterData {
    source: string
    value: string | number | Array<any> | null
}

export interface IFilterProps extends IColProps {
    source: string
    onChange?: ({source, value}: IFilterData) => {}
    label?: string
    size?: Size
}

export interface ITextFilterProps extends IFilterProps{
    value?: string
}

export interface ISelectFilterProps extends IFilterProps{
    value?: Array<string>
    choices: InputChoices
    canBeEmpty?: boolean
    emptyText?: string
}

export interface IPerPageProps {
    value: number
    onChange: (count: number) => void
    choices?: InputChoices
    size?: Size
    label?: string
}

export interface IBulkActionsProps {
    onSelect: (actionType: string) => void
}
