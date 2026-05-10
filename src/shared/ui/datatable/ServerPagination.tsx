"use client";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";

import { TableHeader } from "./header";
import { Pagination } from "./pagination";
import { DatatableProps, ServerPaginationProps } from "@/shared/datatable";
import { Table } from "../Table";

export const ServerPagination = <T,>({
  data,
  columns,
  header,
  serverPagination,
  isLoading,
}: DatatableProps<T> & { serverPagination: ServerPaginationProps }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(serverPagination.currentPage);
  const [pageSize, setPageSize] = useState(serverPagination.pageSize);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0); 
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setCurrentPage(0); 
  };

  return (
    <VStack alignItems="stretch">
      {header?.title && (
        <TableHeader
          {...header}
          searchText={searchText}
          setSearchText={handleSearchChange}
        />
      )}

      <Table data={data} columns={columns} isLoading={isLoading} />

      <Pagination
        currentPage={currentPage + 1}
        pageCount={serverPagination.totalPages}
        pageSize={pageSize}
        setPageSize={handlePageSizeChange}
        onPaginationChange={handlePageChange}
      />
    </VStack>
  );
};
