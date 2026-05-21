import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';

export function isRowActionEnabled(row: ApplicationRow, column: ColumnDefinition) {
  if (column.type !== 'action') {
    return false;
  }

  return row.permissions[column.key as keyof ApplicationRow['permissions']];
}
