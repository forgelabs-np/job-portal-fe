import { TableProps } from "../types";
import { TableHeaderProps } from "./header";
import { TablePaginationProps } from "./pagination";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export type ServerPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};

export type DatatableProps<T> = TableProps<T> & {
  header?: TableHeaderProps;
  autoPagination?: boolean;
  pagination?: Partial<TablePaginationProps>;
  serverPagination?: ServerPaginationProps;
  isLoading?: boolean;
};
