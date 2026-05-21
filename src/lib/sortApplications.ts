import type { ApplicationRow } from '../types/applicationRow';
import type { SortParams } from '../types/applicationView';
import type { ColumnDefinition } from '../types/column';
import { findColumnByKey } from './columns';
import { compareSortableValues, getSortableValue } from './getSortableValue';

export function sortApplications(
  rows: ApplicationRow[],
  columns: ColumnDefinition[],
  params: SortParams,
): ApplicationRow[] {
  const { sortKey, sortDirection } = params;

  if (sortKey == null || sortDirection == null) {
    return rows;
  }

  const column = findColumnByKey(columns, sortKey);

  if (!column?.sortable) {
    return rows;
  }

  return [...rows].sort((left, right) =>
    compareSortableValues(
      getSortableValue(left, column),
      getSortableValue(right, column),
      sortDirection,
    ),
  );
}
