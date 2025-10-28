export type TanDataTableColumn<T> = {
  accessor: keyof T;
  header: string;
  cell?: (info: any) => React.ReactNode;
  showSort?: boolean;
  width?: string;
};

export type TanDataTableProps<T> = {
  columns: TanDataTableColumn<T>[];
  data: T[];
  showCheckbox?: boolean;
  onRowSelect?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  showActions?: boolean;
  className?: string;
  isLoading?: false;
};
