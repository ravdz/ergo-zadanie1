import { useMemo } from 'react';
import type { ApplicationsTablePanelState } from '../../types/applicationView';
import type { SortDirection } from '../../types/sort';
import { filterApplications } from '../../lib/filterApplications';
import { sortApplications } from '../../lib/sortApplications';
import type { ApplicationRow } from '../../types/applicationRow';
import type { ColumnDefinition } from '../../types/column';

type UseApplicationsTableViewParams = {
  loadState: ApplicationsTablePanelState;
  rows: ApplicationRow[];
  columns: ColumnDefinition[];
  searchQuery: string;
  statusFilter: string;
  sortKey: string | null;
  sortDirection: SortDirection;
};

type UseApplicationsTableViewResult = {
  panelState: ApplicationsTablePanelState;
  displayRows: ApplicationRow[];
};

export function resolvePanelState(
  loadState: ApplicationsTablePanelState,
  rawRowCount: number,
  displayRowCount: number,
): ApplicationsTablePanelState {
  if (loadState !== 'success') {
    return loadState;
  }

  if (rawRowCount === 0 || displayRowCount === 0) {
    return 'empty';
  }

  return 'success';
}

export function useApplicationsTableView({
  loadState,
  rows,
  columns,
  searchQuery,
  statusFilter,
  sortKey,
  sortDirection,
}: UseApplicationsTableViewParams): UseApplicationsTableViewResult {
  const displayRows = useMemo(() => {
    const filtered = filterApplications(rows, columns, { searchQuery, statusFilter });

    return sortApplications(filtered, columns, { sortKey, sortDirection });
  }, [rows, columns, searchQuery, statusFilter, sortKey, sortDirection]);

  const panelState = useMemo(
    () => resolvePanelState(loadState, rows.length, displayRows.length),
    [loadState, rows.length, displayRows.length],
  );

  return { panelState, displayRows };
}
