import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';
import type { SortDirection } from '../types/sort';
import { findColumnByKey } from './columns';
import { compareSortableValues, getSortableValue } from './getSortableValue';

export type SortParams = {
  sortKey: string | null;
  sortDirection: SortDirection;
};

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
