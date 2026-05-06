import { DatatableProps } from "@/shared/datatable";
import { DatatableWithAutoPagination } from "./DatatableWithAutoPagination";
import { DatatableWithManualPagination } from "./DatatableWithManualPagination";

export const Datatable = <T,>(props: DatatableProps<T>) => {
  if (props.autoPagination) return <DatatableWithAutoPagination {...props} />;

  return <DatatableWithManualPagination {...props} />;
};
