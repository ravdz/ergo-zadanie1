import { SortIndicator, type SortDirection } from '../atoms/SortIndicator';
import { Th } from '../atoms/Th';

type TableHeadCellProps = {
  label: string;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
};

export function TableHeadCell({
  label,
  sortable = false,
  sortDirection = null,
  onSort,
}: TableHeadCellProps) {
  if (!sortable) {
    return <Th>{label}</Th>;
  }

  return (
    <Th>
      <button
        type="button"
        onClick={onSort}
        className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900"
      >
        {label}
        <SortIndicator direction={sortDirection} />
      </button>
    </Th>
  );
}
