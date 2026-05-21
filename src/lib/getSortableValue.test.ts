import { describe, expect, it } from 'vitest';
import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';
import { compareSortableValues, getSortableValue } from './getSortableValue';

const row: ApplicationRow = {
  loanId: 'LN-1',
  customerName: 'Test',
  status: 'new',
  market: 'PL',
  monthlyRate: 10,
  updatedAt: '2026-01-15T12:00:00Z',
  permissions: { canEdit: true },
};

describe('getSortableValue', () => {
  it('treats empty text as empty sort bucket', () => {
    const value = getSortableValue(
      { ...row, customerName: '   ' },
      { key: 'customerName', label: 'Klient', type: 'text' },
    );

    expect(value).toEqual({ kind: 'empty' });
  });

  it('treats invalid dates as empty sort bucket', () => {
    const value = getSortableValue(
      { ...row, updatedAt: 'nie-data' },
      { key: 'updatedAt', label: 'Data', type: 'date' },
    );

    expect(value).toEqual({ kind: 'empty' });
  });
});

describe('compareSortableValues', () => {
  it('keeps empty values after non-empty values regardless of direction', () => {
    const rateColumn: ColumnDefinition = {
      key: 'monthlyRate',
      label: 'Rata',
      type: 'currency',
    };
    const emptyValue = getSortableValue({ ...row, monthlyRate: Number.NaN }, rateColumn);
    const filledValue = getSortableValue(row, rateColumn);

    expect(compareSortableValues(emptyValue, filledValue, 'asc')).toBeGreaterThan(0);
    expect(compareSortableValues(emptyValue, filledValue, 'desc')).toBeGreaterThan(0);
    expect(compareSortableValues(emptyValue, emptyValue, 'asc')).toBe(0);
  });
});
