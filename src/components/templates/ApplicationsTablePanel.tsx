import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import type { SortDirection } from '../atoms/SortIndicator';
import { TableStateMessage } from '../atoms/TableStateMessage';
import { Table } from '../organisms/Table';
import { TableToolbar } from '../organisms/TableToolbar';

export type ApplicationsTablePanelState = 'loading' | 'success' | 'empty' | 'error';

type ApplicationsTablePanelProps = {
  state: ApplicationsTablePanelState;
  columns: ColumnDefinition[];
  rows: ApplicationRow[];
  statusOptions: string[];
  searchQuery: string;
  statusFilter: string;
  sortKey?: string | null;
  sortDirection?: SortDirection;
  errorMessage?: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onSort?: (key: string) => void;
};

export function ApplicationsTablePanel({
  state,
  columns,
  rows,
  statusOptions,
  searchQuery,
  statusFilter,
  sortKey,
  sortDirection,
  errorMessage,
  onSearchChange,
  onStatusFilterChange,
  onSort,
}: ApplicationsTablePanelProps) {
  return (
    <section className="space-y-4">
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        statusOptions={statusOptions}
        onStatusFilterChange={onStatusFilterChange}
      />

      {state === 'loading' ? <TableStateMessage title="Ładowanie wniosków…" /> : null}

      {state === 'error' ? (
        <TableStateMessage
          title="Nie udało się wczytać danych"
          description={errorMessage ?? 'Spróbuj ponownie później.'}
        />
      ) : null}

      {state === 'empty' ? (
        <TableStateMessage
          title="Brak wniosków"
          description="Zmień filtry lub kryteria wyszukiwania."
        />
      ) : null}

      {state === 'success' ? (
        <Table
          columns={columns}
          rows={rows}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={onSort}
        />
      ) : null}
    </section>
  );
}
