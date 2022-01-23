import {FC, HTMLAttributes, ReactElement, ReactNode} from "react";
import {IColProps} from "../Ui/Col";
import {InputChoices} from "../../inputs/types";
import {Size} from "../../../types/app";
import {Period} from "../Analytics/Charts/Chart";
import {Moment} from "moment";

export interface IDataGridProps extends HTMLAttributes<HTMLDivElement> {
    resource: string
    columns: Array<IDataTableColumn>
    actions?: (item: any) => ReactElement
    size?: Size
    queryParams?: Record<string, any>
    keyProp?: string
    className?: string
    fixedColumns?: boolean
    page?: string | null
    onChangePage?: (page: string) => void
    perPage?: string | null
    onChangePerPage?: (perPage?: string) => void
    sort?: { field: string, order: string } | null
    onChangeSort?: (sort: { field: string, order: string }) => void
    filter?: { [key: string]: any } | null
    bulkActions?: { [key: string]: string }
    disableActions?: boolean
}

export interface IActionProps {
    id: number
    size?: Size
}

export interface IDeleteActionProps extends IActionProps {
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
    perPage: string
    actions?: (item: any) => ReactElement
    onActionClick?: (id: number, actionName: string) => void
    deletingItems: Array<number>
    resource: string
    checkedItems: Array<number>
    onCheckItemClick: (id: number) => void
    onCheckAllClick: () => void
    sortable?: string
    sortDirection?: string
    onChangeSortable?: (source: string) => void
    size?: Size
    sortableSource?: string
    loading: boolean
    disableActions?: boolean
    keyProp?: string
    className?: string
    fixedColumns?: boolean
    bulkActions?: { [key: string]: string }
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
    disableActions?: boolean
    bulkActions?: boolean
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
    onChange: (data: { [key: string]: any }) => void
    size?: Size
    className?: string
}

export interface IFilterComponentValue {
    source: string
    value: any
}

export interface IFilterProps extends IColProps {
    source: string
    onChange?: (value: IFilterComponentValue) => {}
    label?: string
    size?: Size
}

export interface ITextFilterProps extends IFilterProps {
    value?: string
}

export interface ISelectFilterProps extends IFilterProps {
    value?: Array<string>
    choices: InputChoices
    canBeEmpty?: boolean
    emptyText?: string
}

export interface IPeriodValue {
    key: Period
    from?: Moment | string
    to?: Moment | string
    step?: string
}

export interface IPeriodFilterProps extends IFilterProps {
    value: IPeriodValue
}

export interface IPerPageProps {
    value?: string
    onChange: (count: string) => void
    choices?: InputChoices
    size?: Size
    label?: string
    disabled?: boolean
}

export interface IBulkActionsProps {
    actions?: { [key: string]: string }
    onSelect: (actionType: string) => void
}
