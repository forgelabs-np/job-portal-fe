"use client";

import {
  Box,
  Table as ChakraTable,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

import { DataTableProps, MetaProps } from "./DataTable.types";
import { NewPagination } from "./NewPagination";

export function DataTable<T extends object>({
  columns,
  data,
  isLoading = false,
  hasPagination = true,
  payload,
  setPayload,
  onSearchChange,
  headerAlign = "space-between",
  maxHeight = "calc(100vh - 418px)",
  onExport,
  exportLoading,
  isCheckboxRequired = false,
  setTableRowCheckedIds,
  checkedIdKeyName,
  actionButton,
  exportParams,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <Stack
      width={"full"}
      p={4}
      border={"1px solid"}
      borderColor={"gray.200"}
      borderRadius={"xl"}
      ref={tableRef}
      background={isFullscreen ? "white" : "transparent"}
      maxH={"700px"}
    >
      <HStack
        mb={4}
        alignItems={"center"}
        justifyContent={headerAlign}
        gap={2}
        flexWrap={"wrap"}
      >
        {onSearchChange && (
          <Box>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "14px",
                width: "200px",
              }}
            />
          </Box>
        )}
        <HStack flex={1} justify={{ base: "center", md: "flex-end" }}>
          {(onExport || exportParams) && (
            <button
              disabled={exportLoading}
              onClick={() => {
                if (onExport) {
                  onExport();
                }
              }}
              style={{
                padding: "8px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                backgroundColor: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {exportLoading ? "Loading..." : "Export"}
            </button>
          )}

          {actionButton && (
            <button
              onClick={actionButton.onClick}
              style={{
                padding: "8px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                backgroundColor: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {actionButton.icon}
              {actionButton.text}
            </button>
          )}
          <IconButton
            variant={"surface"}
            onClick={() => {
              if (!tableRef.current) return;

              if (!isFullscreen) {
                (tableRef.current as HTMLElement).requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
            style={{
              padding: "8px",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </IconButton>
        </HStack>
      </HStack>

      <ChakraTable.ScrollArea
        maxHeight={isFullscreen ? "calc(100dvh - 190px)" : maxHeight}
      >
        <ChakraTable.Root
          css={{
            "& tbody tr": {
              _odd: { bg: "white" },
              _even: { bg: "gray.75" },
            },
          }}
          borderCollapse={"separate"}
          borderSpacing={0}
        >
          <ChakraTable.Header position={"sticky"} top={"0px"} zIndex={10}>
            <ChakraTable.Row backgroundColor={"gray.25"}>
              {table?.getHeaderGroups()?.map((headerGroup) =>
                headerGroup.headers?.map((header) => {
                  const meta =
                    (header.column.columnDef?.meta as MetaProps) || {};
                  return (
                    <ChakraTable.ColumnHeader
                      key={header.id}
                      css={{ ...meta }}
                      borderTop={"1px solid"}
                      borderColor={"gray.200"}
                    >
                      <Text
                        fontSize={"14px"}
                        fontWeight={700}
                        color={"gray.700"}
                        textTransform={"capitalize"}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Text>
                    </ChakraTable.ColumnHeader>
                  );
                }),
              )}
            </ChakraTable.Row>
          </ChakraTable.Header>
          <ChakraTable.Body>
            {isLoading ? (
              <ChakraTable.Row>
                <ChakraTable.Cell
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  textAlign={"center"}
                  borderBottom={0}
                >
                  <Stack width={"full"}>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                  </Stack>
                </ChakraTable.Cell>
              </ChakraTable.Row>
            ) : data?.length === 0 ? (
              <ChakraTable.Row>
                <ChakraTable.Cell
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  textAlign={"center"}
                  borderBottom={0}
                >
                  <Text color="gray.500" py={8}>
                    No Data Available
                  </Text>
                </ChakraTable.Cell>
              </ChakraTable.Row>
            ) : (
              table.getRowModel().rows?.map((row) => (
                <ChakraTable.Row key={row.id}>
                  {row.getVisibleCells()?.map((cell) => {
                    const meta =
                      (cell.column.columnDef?.meta as MetaProps) || {};
                    return (
                      <ChakraTable.Cell
                        key={cell.id}
                        css={{ ...meta }}
                        fontSize={"14px"}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </ChakraTable.Cell>
                    );
                  })}
                </ChakraTable.Row>
              ))
            )}
          </ChakraTable.Body>
        </ChakraTable.Root>
      </ChakraTable.ScrollArea>

      {data?.length !== 0 && hasPagination && payload && setPayload && (
        <Box>
          <NewPagination payload={payload} setPayload={setPayload} />
        </Box>
      )}
    </Stack>
  );
}
