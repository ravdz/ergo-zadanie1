import { useEffect, useState } from 'react';
import type { ApplicationRow } from '../../types/applicationRow';
import type { ApplicationsTablePanelState } from '../../components/templates/ApplicationsTablePanel';

type UseApplicationsDataResult = {
  state: ApplicationsTablePanelState;
  rows: ApplicationRow[];
  errorMessage?: string;
};

export function useApplicationsData(): UseApplicationsDataResult {
  const [state, setState] = useState<ApplicationsTablePanelState>('loading');
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        const response = await fetch('/data/rows.json');

        if (!response.ok) {
          throw new Error(`Nie udało się pobrać wierszy (HTTP ${response.status}).`);
        }

        const data = (await response.json()) as ApplicationRow[];

        if (cancelled) {
          return;
        }

        setRows(data);
        setState(data.length === 0 ? 'empty' : 'success');
      } catch (error) {
        if (cancelled) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Nieznany błąd.');
        setState('error');
      }
    }

    void loadRows();

    return () => {
      cancelled = true;
    };
  }, []);

  return { state, rows, errorMessage };
}
