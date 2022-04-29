import {
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table'

declare module 'react-table' {
  export type TableOptions<D extends object> = UseSortByOptions<D>
  export type TableInstance<D extends object = Record<string, unknown>> = UseSortByInstanceProps<D>
  export type TableState<D extends object = Record<string, unknown>> = UseSortByState<D>
  export type Column<D extends object = Record<string, unknown>> = UseSortByColumnOptions<D>
  export type ColumnInstance<D extends object = Record<string, unknown>> = UseSortByColumnProps<D>
}
