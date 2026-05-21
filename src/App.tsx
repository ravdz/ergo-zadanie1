import { useState } from 'react';
import { ApplicationsTablePanel } from './components/templates/ApplicationsTablePanel';
import type { SortDirection } from './components/atoms/SortIndicator';
import columns from './data/columns.json';
import { useApplicationsData } from './features/applications/useApplicationsData';
import { findColumnByKey } from './lib/columns';
import type { ColumnDefinition } from './types/column';

const columnDefinitions = columns as ColumnDefinition[];
const statusOptions = findColumnByKey(columnDefinitions, 'status')?.options ?? [];

export function App() {
  const { state, rows, errorMessage } = useApplicationsData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

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
        state={state}
        columns={columnDefinitions}
        rows={rows}
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
