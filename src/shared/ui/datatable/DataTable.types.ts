export interface MetaProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  textAlign?: "left" | "center" | "right";
  padding?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
}

export interface FilterPayloadType {
  page?: number;
  pageSize?: number;
  q?: string;
  pageCount?: number;
  count?: number;
  display_count?: number;
  next?: boolean;
  previous?: boolean;
  customPageSize?: number[];
}

export interface DataTableProps<T extends object> {
  columns: any[];
  data: T[];
  isLoading?: boolean;
  hasPagination?: boolean;
  payload?: FilterPayloadType;
  setPayload?: (payload: (prev: any) => any) => void;
  onSearchChange?: (searchTerm: string) => void;
  headerAlign?: "start" | "center" | "end" | "space-between";
  maxHeight?: string;
  onExport?: () => void;
  exportLoading?: boolean;
  isCheckboxRequired?: boolean;
  setTableRowCheckedIds?: (ids: any[]) => void;
  checkedIdKeyName?: string;
  actionButton?: {
    onClick: () => void;
    icon: React.ReactNode;
    text: string;
  };
  exportParams?: any;
}

export interface PaginationProps {
  payload?: {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    count?: number;
    display_count?: number;
    customPageSize?: number[];
  };
  setPayload?: (payload: any) => void;
}
