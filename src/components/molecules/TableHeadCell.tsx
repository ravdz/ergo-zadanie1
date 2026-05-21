import { memo, useCallback } from 'react';
import { SortIndicator, type SortDirection } from '../atoms/SortIndicator';
import { Th } from '../atoms/Th';

type TableHeadCellProps = {
  columnKey: string;
  label: string;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
};

export const TableHeadCell = memo(function TableHeadCell({
  columnKey,
  label,
  sortable = false,
  sortDirection = null,
  onSort,
}: TableHeadCellProps) {
  const handleSort = useCallback(() => {
    onSort?.(columnKey);
  }, [columnKey, onSort]);

  if (!sortable) {
    return <Th>{label}</Th>;
  }

  return (
    <Th>
      <button
        type="button"
        onClick={handleSort}
        className="inline-flex cursor-pointer items-center gap-1 font-medium text-slate-700 hover:text-slate-900"
      >
        {label}
        <SortIndicator direction={sortDirection} />
      </button>
    </Th>
  );
});
