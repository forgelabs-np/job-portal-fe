"use client";
import { VStack } from "@chakra-ui/react";
import { useState, useMemo } from "react";

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
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    
    return data.filter((item) => {
      return Object.values(item as any).some((value) => 
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [data, searchText]);

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  // Reset to first page when search changes
  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
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

      <Table data={paginatedData} columns={columns} isLoading={isLoading} />

      {pagination && (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          onPaginationChange={setCurrentPage}
        />
      )}
    </VStack>
  );
};
