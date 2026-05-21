import { describe, expect, it } from 'vitest';
import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';
import { isRowActionEnabled } from './rowActions';

const editColumn: ColumnDefinition = {
  key: 'canEdit',
  label: 'Edycja',
  type: 'action',
  action: 'edit',
};

const row: ApplicationRow = {
  loanId: 'LN-1',
  customerName: 'Anna',
  status: 'new',
  market: 'PL',
  monthlyRate: 100,
  updatedAt: '2026-01-01T10:00:00Z',
  permissions: { canEdit: true },
};

describe('isRowActionEnabled', () => {
  it('returns true when row permissions allow the action key', () => {
    expect(isRowActionEnabled(row, editColumn)).toBe(true);
  });

  it('returns false when permissions deny the action', () => {
    expect(isRowActionEnabled({ ...row, permissions: { canEdit: false } }, editColumn)).toBe(false);
  });

  it('returns false for non-action columns', () => {
    expect(isRowActionEnabled(row, { key: 'canEdit', label: 'Edycja', type: 'text' })).toBe(false);
  });
});
