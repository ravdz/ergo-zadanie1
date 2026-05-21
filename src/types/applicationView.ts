import type { SortDirection } from './sort';

export type ApplicationsTablePanelState = 'loading' | 'success' | 'empty' | 'error';

export type FilterParams = {
  searchQuery: string;
  statusFilter: string;
};

export type SortParams = {
  sortKey: string | null;
  sortDirection: SortDirection;
};
