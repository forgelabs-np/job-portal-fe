import { HStack, Box, Text, Button } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

import "@/shared/styles/pagination.css";

import { TablePaginationIcon } from "./TablePaginationIcon";
import { PageSizeSelector } from "./PageSizeSelector";
import { TablePaginationProps } from "@/shared/datatable";

export const Pagination = ({
  currentPage,
  pageCount,
  onPaginationChange,
  pageSize,
  setPageSize,
}: TablePaginationProps) => {
  const pageRangeDisplayed = 3;
  const marginPagesDisplayed = 2;

  // need to add 1 because pagination change returns the index
  const handlePaginationChange = (selected: number) => {
    onPaginationChange(selected + 1);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap={4}
      py={4}
      px={2}
      borderTop="1px solid"
      borderColor="gray.200"
      bg="white"
    >
      <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />

      <HStack gap={2} alignItems="center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePaginationChange(currentPage - 2)}
          disabled={currentPage === 1}
          borderRadius="md"
          borderColor="gray.300"
          color="gray.600"
          _hover={{
            bg: "gray.50",
            borderColor: "gray.400",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          Previous
        </Button>

        <ReactPaginate
          forcePage={currentPage - 1}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={<></>}
          nextLabel={<></>}
          onPageChange={(page) => handlePaginationChange(page.selected)}
          className="pagination-custom"
          activeClassName="pagination-custom__link--active"
          breakLabel="..."
          breakClassName="pagination-custom__break"
        />

        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePaginationChange(currentPage)}
          disabled={currentPage === pageCount}
          borderRadius="md"
          borderColor="gray.300"
          color="gray.600"
          _hover={{
            bg: "gray.50",
            borderColor: "gray.400",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};
