import { Table } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "../form";
import { MetaProps, TableProps } from "@/shared/types";

export const TableWithCheckbox = <T,>({
  data,
  columns,
  selectedItems,
  onSelectionChange,
  setSelectedItems,
}: TableProps<T> & {
  selectedItems: Set<string>;
  onSelectionChange: (id: string) => void;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
}) => {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => (row as { id: string })?.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const allSelected =
    data.length > 0 &&
    data.every((item) => selectedItems.has((item as { id: string }).id));

  return (
    <Table.Root>
      {/* Table Header */}
      <Table.Header whiteSpace="nowrap">
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            <Table.ColumnHeader
              py="16px"
              borderColor="system.neutral.separator.light"
            >
              <Checkbox
                checked={allSelected}
                onCheckedChange={() => {
                  if (allSelected) {
                    setSelectedItems(new Set());
                  } else {
                    const newSelection = new Set(
                      data.map((item) => (item as { id: string }).id)
                    );
                    setSelectedItems(newSelection);
                  }
                }}
              />
            </Table.ColumnHeader>
            {headerGroup.headers.map((header) => {
              const meta = (header.column.columnDef?.meta as MetaProps) || {};
              return (
                <Table.ColumnHeader
                  key={header.id}
                  py="16px"
                  borderColor="system.neutral.separator.light"
                  fontSize="14px"
                  color="system.text.normal.light"
                  {...meta}
                >
                  {header.isPlaceholder
                    ? null
                    : (flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) as React.ReactNode)}
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>

      {/* Table Body */}
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell border="0" py="16px">
              <Checkbox
                checked={selectedItems.has(row.id)}
                onCheckedChange={() => onSelectionChange(row.id)}
              />
            </Table.Cell>
            {row.getVisibleCells().map((cell) => {
              const meta = (cell.column.columnDef?.meta as MetaProps) || {};
              return (
                <Table.Cell
                  key={cell.id}
                  py="16px"
                  borderColor="system.neutral.separator.light"
                  {...meta}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
