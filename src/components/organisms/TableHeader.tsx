import { memo } from 'react';
import type { ColumnDefinition } from '../../types/column';
import type { SortDirection } from '../../types/sort';
import { TableHeadCell } from '../molecules/TableHeadCell';

type TableHeaderProps = {
  columns: ColumnDefinition[];
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
};

export const TableHeader = memo(function TableHeader({
  columns,
  sortKey,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeadCell
            key={column.key}
            columnKey={column.key}
            label={column.label}
            sortable={column.sortable}
            sortDirection={sortKey === column.key ? sortDirection : null}
            onSort={column.sortable ? onSort : undefined}
          />
        ))}
      </tr>
    </thead>
  );
});
