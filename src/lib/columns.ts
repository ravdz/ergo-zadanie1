import type { ColumnDefinition } from '../types/column';

export function findColumnByKey(
  columns: ColumnDefinition[],
  key: string,
): ColumnDefinition | undefined {
  return columns.find((column) => column.key === key);
}
