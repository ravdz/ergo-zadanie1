import { describe, expect, it } from 'vitest';
import columnsData from '../data/columns.json';
import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';
import { filterApplications, getSearchableColumnKeys } from './filterApplications';

const columns = columnsData as ColumnDefinition[];

const rows: ApplicationRow[] = [
  {
    loanId: 'LN-001',
    customerName: 'Anna Kowalska',
    status: 'approved',
    market: 'PL',
    monthlyRate: 100,
    updatedAt: '2026-01-01T10:00:00Z',
    permissions: { canEdit: true },
  },
  {
    loanId: 'LN-002',
    customerName: 'Jan Nowak',
    status: 'new',
    market: 'CZ',
    monthlyRate: 200,
    updatedAt: '2026-02-01T10:00:00Z',
    permissions: { canEdit: false },
  },
  {
    loanId: 'LN-003',
    customerName: 'Ewa Michalski',
    status: 'rejected',
    market: 'DE',
    monthlyRate: 300,
    updatedAt: '2026-03-01T10:00:00Z',
    permissions: { canEdit: false },
  },
];

describe('getSearchableColumnKeys', () => {
  it('returns filterable text column keys from metadata', () => {
    expect(getSearchableColumnKeys(columns)).toEqual(['loanId', 'customerName', 'market']);
  });
});

describe('filterApplications', () => {
  it('filters rows by status', () => {
    const result = filterApplications(rows, columns, {
      searchQuery: '',
      statusFilter: 'approved',
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.loanId).toBe('LN-001');
  });

  it('filters rows by search query across searchable text fields', () => {
    const result = filterApplications(rows, columns, {
      searchQuery: 'nowak',
      statusFilter: '',
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.customerName).toBe('Jan Nowak');
  });

  it('matches loan id in search', () => {
    const result = filterApplications(rows, columns, {
      searchQuery: 'ln-003',
      statusFilter: '',
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.loanId).toBe('LN-003');
  });

  it('returns empty array when nothing matches', () => {
    const result = filterApplications(rows, columns, {
      searchQuery: 'brak',
      statusFilter: 'approved',
    });

    expect(result).toEqual([]);
  });
});
