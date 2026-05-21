import { SearchField } from '../molecules/SearchField';
import { StatusFilterField } from '../molecules/StatusFilterField';

type TableToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  statusOptions: string[];
  onStatusFilterChange: (value: string) => void;
};

export function TableToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  statusOptions,
  onStatusFilterChange,
}: TableToolbarProps) {
  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2">
      <SearchField
        label="Szukaj"
        value={searchQuery}
        placeholder="np. klient lub ID wniosku"
        onChange={onSearchChange}
      />
      <StatusFilterField
        label="Status"
        value={statusFilter}
        options={statusOptions}
        onChange={onStatusFilterChange}
      />
    </div>
  );
}
