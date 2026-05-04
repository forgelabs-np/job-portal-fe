import { ColumnDef } from "@tanstack/react-table";

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  selectedItems: Set<string>;
  onSelectionChange: (id: string | "clear") => void;
};

export type MetaProps = {
  width?: string;
  textAlign?: string;
};
