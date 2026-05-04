export type PaginationPropsTypes = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, size: number) => void;
};
