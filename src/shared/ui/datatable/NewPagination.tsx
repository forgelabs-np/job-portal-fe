"use client";

import { Flex, HStack, Text } from "@chakra-ui/react";
import { useMemo } from "react";

interface PaginationProps {
  payload?: {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    count?: number;
    display_count?: number;
    customPageSize?: number[];
  };
  setPayload?: (payload: (prev: any) => any) => void;
}

function getMiddlePages(currentPage: number, totalPageCount: number): number[] {
  if (totalPageCount <= 0) return [];
  if (totalPageCount <= 5) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }
  const windowSize = 3;
  const start = Math.max(2, currentPage - Math.floor(windowSize / 2));
  const end = Math.min(totalPageCount - 1, start + windowSize - 1);
  const adjustedStart = Math.max(2, end - windowSize + 1);
  return Array.from(
    { length: end - adjustedStart + 1 },
    (_, i) => adjustedStart + i,
  );
}

export const NewPagination = ({ payload, setPayload }: PaginationProps) => {
  const totalPageCount = Math.max(1, payload?.pageCount ?? 1);
  const currentPage = Math.min(Math.max(1, payload?.page ?? 1), totalPageCount);
  const totalCount = payload?.count ?? 0;

  const middlePages = useMemo(
    () => getMiddlePages(currentPage, totalPageCount),
    [currentPage, totalPageCount],
  );

  const showLeftEllipsis = totalPageCount > 5 && middlePages[0] > 2;
  const showRightEllipsis =
    totalPageCount > 5 &&
    middlePages[middlePages.length - 1] < totalPageCount - 1;

  const handlePageClick = (pageIndex: number) => {
    setPayload?.((prev) => ({
      ...prev,
      page: pageIndex,
    }));
  };

  const handleNextClick = () => {
    setPayload?.((prev) => ({
      ...prev,
      page: Math.min((prev.page ?? 1) + 1, totalPageCount),
    }));
  };

  const handlePrevClick = () => {
    setPayload?.((prev) => ({
      ...prev,
      page: Math.max((prev.page ?? 1) - 1, 1),
    }));
  };

  const handlePageSizeChange = (newSize: string) => {
    const size = parseInt(newSize, 10);
    if (!Number.isNaN(size)) {
      setPayload?.((prev) => ({
        ...prev,
        pageSize: size,
      }));
    }
  };

  const hasPagination = totalPageCount > 1;

  const renderPageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      style={{
        width: "36px",
        height: "36px",
        padding: "0",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        backgroundColor: currentPage === pageNumber ? "#3182ce" : "white",
        color: currentPage === pageNumber ? "white" : "#718096",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: currentPage === pageNumber ? "600" : "500",
        transition: "all 0.2s ease",
      }}
      onClick={() => handlePageClick(pageNumber)}
      onMouseEnter={(e) => {
        if (currentPage !== pageNumber) {
          e.currentTarget.style.backgroundColor = "#f7fafc";
        }
      }}
      onMouseLeave={(e) => {
        if (currentPage !== pageNumber) {
          e.currentTarget.style.backgroundColor = "white";
        }
      }}
    >
      {pageNumber}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <Flex
      key={key}
      alignItems="center"
      justifyContent="center"
      w="36px"
      h="36px"
      fontSize="14px"
      color="gray.500"
      flexShrink={0}
    >
      ...
    </Flex>
  );

  const pageSizes = payload?.customPageSize ?? [5, 10, 25, 50];

  return (
    <Flex
      width="100%"
      justifyContent={{ base: "center", md: "space-between" }}
      gap={4}
      alignItems="center"
      mt={2}
      flexWrap="wrap"
      rowGap={4}
    >
      {/* Rows per page */}
      <Flex alignItems="center" gap={3} flexShrink={0}>
        <Text whiteSpace="nowrap" fontSize="sm" color="gray.600">
          Rows per page
        </Text>
        <select
          value={String(payload?.pageSize ?? 10)}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          style={{
            padding: "4px 8px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            fontSize: "14px",
            width: "80px",
            cursor: "pointer",
          }}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </Flex>

      <HStack gap={4} flexWrap="wrap">
        {hasPagination && (
          <Flex gap={2} alignItems="center" flexWrap="wrap">
            <button
              style={{
                width: "36px",
                height: "36px",
                padding: "0",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                backgroundColor: "white",
                cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                opacity: currentPage <= 1 ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
              onClick={handlePrevClick}
              disabled={currentPage <= 1}
            >
              ‹
            </button>

            <HStack gap={1}>
              {totalPageCount <= 5 ? (
                middlePages.map(renderPageButton)
              ) : (
                <>
                  {renderPageButton(1)}
                  {showLeftEllipsis && renderEllipsis("left-ellipsis")}
                  {middlePages.map(renderPageButton)}
                  {showRightEllipsis && renderEllipsis("right-ellipsis")}
                  {renderPageButton(totalPageCount)}
                </>
              )}
            </HStack>

            <button
              style={{
                width: "36px",
                height: "36px",
                padding: "0",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                backgroundColor: "white",
                cursor: currentPage >= totalPageCount ? "not-allowed" : "pointer",
                opacity: currentPage >= totalPageCount ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
              onClick={handleNextClick}
              disabled={currentPage >= totalPageCount}
            >
              ›
            </button>
          </Flex>
        )}

        <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
          {totalCount > 0 ? (
            <>
              Showing{" "}
              <span style={{ fontWeight: 600 }}>
                {payload?.display_count ?? 0}
              </span>{" "}
              of{" "}
              <span style={{ fontWeight: 600 }}>{totalCount}</span> entries
            </>
          ) : (
            "No entries"
          )}
        </Text>
      </HStack>
    </Flex>
  );
};
