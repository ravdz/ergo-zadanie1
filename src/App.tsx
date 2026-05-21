import { useState } from 'react';
import { ApplicationsTablePanel } from './components/templates/ApplicationsTablePanel';
import { useApplicationsData } from './features/applications/useApplicationsData';
import { useApplicationsTableView } from './features/applications/useApplicationsTableView';
import { findColumnByKey } from './lib/columns';
import type { ColumnDefinition } from './types/column';
import type { SortDirection } from './types/sort';
import columns from './data/columns.json';

const columnDefinitions = columns as ColumnDefinition[];
const statusOptions = findColumnByKey(columnDefinitions, 'status')?.options ?? [];

export function App() {
  const { state: loadState, rows, errorMessage } = useApplicationsData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const { panelState, displayRows } = useApplicationsTableView({
    loadState,
    rows,
    columns: columnDefinitions,
    searchQuery,
    statusFilter,
    sortKey,
    sortDirection,
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">Wnioski</h1>

      <ApplicationsTablePanel
        state={panelState}
        columns={columnDefinitions}
        rows={displayRows}
        statusOptions={statusOptions}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        sortKey={sortKey}
        sortDirection={sortDirection}
        errorMessage={errorMessage}
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setStatusFilter}
        onSort={handleSort}
      />
    </main>
  );
}
