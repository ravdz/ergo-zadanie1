import { memo } from 'react';
import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import type { SortDirection } from '../../types/sort';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

type TableProps = {
  columns: ColumnDefinition[];
  rows: ApplicationRow[];
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
};

export const Table = memo(function Table({
  columns,
  rows,
  sortKey,
  sortDirection,
  onSort,
}: TableProps) {
  return (
    <table className="w-full border-collapse text-left text-sm text-slate-800">
      <TableHeader
        columns={columns}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <TableBody columns={columns} rows={rows} />
    </table>
  );
});
