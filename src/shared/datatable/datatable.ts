import { TableProps } from "../types";
import { TableHeaderProps } from "./header";
import { TablePaginationProps } from "./pagination";

export type DatatableProps<T> = TableProps<T> & {
  header?: TableHeaderProps;
  autoPagination?: boolean;
  pagination?: TablePaginationProps;
  isLoading?: boolean;
};
