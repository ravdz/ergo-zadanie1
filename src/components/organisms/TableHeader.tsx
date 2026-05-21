import type { ColumnDefinition } from '../../types/column';
import type { SortDirection } from '../atoms/SortIndicator';
import { TableHeadCell } from '../molecules/TableHeadCell';

type TableHeaderProps = {
  columns: ColumnDefinition[];
  sortKey?: string | null;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
};

export function TableHeader({
  columns,
  sortKey = null,
  sortDirection = null,
  onSort,
}: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeadCell
            key={column.key}
            label={column.label}
            sortable={column.sortable}
            sortDirection={sortKey === column.key ? sortDirection : null}
            onSort={column.sortable ? () => onSort?.(column.key) : undefined}
          />
        ))}
      </tr>
    </thead>
  );
}
