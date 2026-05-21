import { describe, expect, it } from 'vitest';
import columnsData from '../data/columns.json';
import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';
import { sortApplications } from './sortApplications';

const columns = columnsData as ColumnDefinition[];

const rows: ApplicationRow[] = [
  {
    loanId: 'LN-B',
    customerName: 'Zygmunt',
    status: 'new',
    market: 'PL',
    monthlyRate: 500,
    updatedAt: '2026-03-01T10:00:00Z',
    permissions: { canEdit: true },
  },
  {
    loanId: 'LN-A',
    customerName: 'Anna',
    status: 'new',
    market: 'PL',
    monthlyRate: 100,
    updatedAt: '2026-01-01T10:00:00Z',
    permissions: { canEdit: true },
  },
  {
    loanId: 'LN-C',
    customerName: 'Brak daty',
    status: 'new',
    market: 'PL',
    monthlyRate: NaN,
    updatedAt: '',
    permissions: { canEdit: false },
  },
];

describe('sortApplications', () => {
  it('sorts text columns ascending using locale rules', () => {
    const result = sortApplications(rows, columns, {
      sortKey: 'customerName',
      sortDirection: 'asc',
    });

    expect(result.map((row) => row.customerName)).toEqual(['Anna', 'Brak daty', 'Zygmunt']);
  });

  it('sorts currency columns descending', () => {
    const result = sortApplications(rows, columns, {
      sortKey: 'monthlyRate',
      sortDirection: 'desc',
    });

    expect(result.map((row) => row.loanId)).toEqual(['LN-B', 'LN-A', 'LN-C']);
  });

  it('sorts date columns ascending', () => {
    const result = sortApplications(rows, columns, {
      sortKey: 'updatedAt',
      sortDirection: 'asc',
    });

    expect(result.map((row) => row.loanId)).toEqual(['LN-A', 'LN-B', 'LN-C']);
  });

  it('places rows with missing sort values at the end for both directions', () => {
    const ascending = sortApplications(rows, columns, {
      sortKey: 'monthlyRate',
      sortDirection: 'asc',
    });

    const descending = sortApplications(rows, columns, {
      sortKey: 'monthlyRate',
      sortDirection: 'desc',
    });

    expect(ascending.at(-1)?.loanId).toBe('LN-C');
    expect(descending.at(-1)?.loanId).toBe('LN-C');
  });

  it('returns original order when sort is not active', () => {
    const result = sortApplications(rows, columns, {
      sortKey: null,
      sortDirection: null,
    });

    expect(result).toEqual(rows);
  });
});
