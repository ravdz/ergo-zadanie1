import { memo, useEffect, useState } from 'react';
import { SEARCH_DEBOUNCE_MS, useDebouncedValue } from '../../lib/useDebouncedValue';
import { SearchField } from '../molecules/SearchField';
import { StatusFilterField } from '../molecules/StatusFilterField';

type TableToolbarProps = {
  onDebouncedSearchChange: (value: string) => void;
  statusFilter: string;
  statusOptions: string[];
  onStatusFilterChange: (value: string) => void;
};

export const TableToolbar = memo(function TableToolbar({
  onDebouncedSearchChange,
  statusFilter,
  statusOptions,
  onStatusFilterChange,
}: TableToolbarProps) {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    onDebouncedSearchChange(debouncedSearch);
  }, [debouncedSearch, onDebouncedSearchChange]);

  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2">
      <SearchField
        label="Szukaj"
        value={searchInput}
        placeholder="np. klient lub ID wniosku"
        onChange={setSearchInput}
      />
      <StatusFilterField
        label="Status"
        value={statusFilter}
        options={statusOptions}
        onChange={onStatusFilterChange}
      />
    </div>
  );
});
