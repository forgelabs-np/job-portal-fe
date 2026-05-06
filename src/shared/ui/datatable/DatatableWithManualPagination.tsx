import { VStack } from "@chakra-ui/react";

import { TableHeader } from "./header";
import { Pagination } from "./pagination";
import { DatatableProps } from "@/shared/datatable";
import { Table } from "../Table";

export const DatatableWithManualPagination = <T,>({
  data,
  columns,
  header,
  pagination,
  isLoading,
}: DatatableProps<T>) => {
  return (
    <VStack alignItems="stretch">
      {header?.title && <TableHeader {...header} />}

      <Table data={data} columns={columns} isLoading={isLoading} />

      {pagination && <Pagination {...pagination} />}
    </VStack>
  );
};
