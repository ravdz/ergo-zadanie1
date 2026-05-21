import type { ApplicationRow } from '../types/applicationRow';
import type { FilterParams } from '../types/applicationView';
import type { ColumnDefinition } from '../types/column';

export function getSearchableColumnKeys(columns: ColumnDefinition[]): string[] {
  return columns
    .filter((column) => column.filterable && column.type === 'text')
    .map((column) => column.key);
}

export function filterApplications(
  rows: ApplicationRow[],
  columns: ColumnDefinition[],
  params: FilterParams,
): ApplicationRow[] {
  const query = params.searchQuery.trim().toLowerCase();
  const status = params.statusFilter;
  const searchableKeys = getSearchableColumnKeys(columns);

  return rows.filter((row) => {
    if (status !== '' && row.status !== status) {
      return false;
    }

    if (query === '') {
      return true;
    }

    return searchableKeys.some((key) => {
      const value = row[key as keyof ApplicationRow];

      if (value == null) {
        return false;
      }

      return String(value).toLowerCase().includes(query);
    });
  });
}
