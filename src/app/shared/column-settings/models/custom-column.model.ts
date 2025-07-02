import { NzCustomColumn, NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
export interface CustomColumn<T = any>  extends NzCustomColumn {
    name: string;
    value: string;
    key: string;
    width: number;
    default: boolean;
    originalIndex?: number;
    required?: boolean;
    position?: 'left' | 'right'
    sortable?: boolean;
    compare?: (a: any, b: any) => number;
    visible?: boolean;
    fixed?: boolean | 'left' | 'right';
    fixWidth?: boolean;
    showSort?: boolean;
    sortOrder: NzTableSortOrder | null;
    sortDirections: NzTableSortOrder[];
    filterMultiple: boolean;
    filters: NzTableFilterList;
    filterFn: NzTableFilterFn<T> | null;
    sortFn: NzTableSortFn<T> | null;
}