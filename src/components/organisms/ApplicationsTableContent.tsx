import { memo } from 'react';
import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import type { SortDirection } from '../../types/sort';
import type { ApplicationsTablePanelState } from '../../types/applicationView';
import { TableStateMessage } from '../atoms/TableStateMessage';
import { Table } from './Table';

type ApplicationsTableContentProps = {
  state: ApplicationsTablePanelState;
  columns: ColumnDefinition[];
  rows: ApplicationRow[];
  sortKey: string | null;
  sortDirection: SortDirection;
  errorMessage?: string;
  onSort: (key: string) => void;
};

export const ApplicationsTableContent = memo(function ApplicationsTableContent({
  state,
  columns,
  rows,
  sortKey,
  sortDirection,
  errorMessage,
  onSort,
}: ApplicationsTableContentProps) {
  if (state === 'loading') {
    return <TableStateMessage title="Ładowanie wniosków…" />;
  }

  if (state === 'error') {
    return (
      <TableStateMessage
        title="Nie udało się wczytać danych"
        description={errorMessage ?? 'Spróbuj ponownie później.'}
      />
    );
  }

  if (state === 'empty') {
    return (
      <TableStateMessage
        title="Brak wniosków"
        description="Zmień filtry lub kryteria wyszukiwania."
      />
    );
  }

  return (
    <Table
      columns={columns}
      rows={rows}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
    />
  );
});
