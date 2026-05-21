export type ColumnType = 'text' | 'badge' | 'currency' | 'date' | 'action';

export type ColumnDefinition = {
  key: string;
  label: string;
  type: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  options?: string[];
  action?: string;
};
