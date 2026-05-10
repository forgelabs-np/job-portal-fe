import { DatatableProps } from "@/shared/datatable";
import { DatatableWithAutoPagination } from "./DatatableWithAutoPagination";
import { DatatableWithManualPagination } from "./DatatableWithManualPagination";
import { ServerPagination } from "./ServerPagination";

export const Datatable = <T,>(props: DatatableProps<T>) => {
  if (props.serverPagination) return <ServerPagination {...props} serverPagination={props.serverPagination} />;
  if (props.autoPagination) return <DatatableWithAutoPagination {...props} />;

  return <DatatableWithManualPagination {...props} />;
};
