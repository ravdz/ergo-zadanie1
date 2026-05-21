import { memo } from 'react';
import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import type { SortDirection } from '../../types/sort';
import { ApplicationsTableContent } from '../organisms/ApplicationsTableContent';
import { TableToolbar } from '../organisms/TableToolbar';

export type ApplicationsTablePanelState = 'loading' | 'success' | 'empty' | 'error';

type ApplicationsTablePanelProps = {
  state: ApplicationsTablePanelState;
  columns: ColumnDefinition[];
  rows: ApplicationRow[];
  statusOptions: string[];
  statusFilter: string;
  sortKey: string | null;
  sortDirection: SortDirection;
  errorMessage?: string;
  onDebouncedSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onSort: (key: string) => void;
};

export const ApplicationsTablePanel = memo(function ApplicationsTablePanel({
  state,
  columns,
  rows,
  statusOptions,
  statusFilter,
  sortKey,
  sortDirection,
  errorMessage,
  onDebouncedSearchChange,
  onStatusFilterChange,
  onSort,
}: ApplicationsTablePanelProps) {
  return (
    <section className="space-y-4">
      <TableToolbar
        onDebouncedSearchChange={onDebouncedSearchChange}
        statusFilter={statusFilter}
        statusOptions={statusOptions}
        onStatusFilterChange={onStatusFilterChange}
      />

      <ApplicationsTableContent
        state={state}
        columns={columns}
        rows={rows}
        sortKey={sortKey}
        sortDirection={sortDirection}
        errorMessage={errorMessage}
        onSort={onSort}
      />
    </section>
  );
});
