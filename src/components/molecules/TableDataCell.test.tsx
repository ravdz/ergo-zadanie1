import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ApplicationRow } from '../../types/applicationRow';
import type { ColumnDefinition } from '../../types/column';
import { TableDataCell } from './TableDataCell';

const editColumn: ColumnDefinition = {
  key: 'canEdit',
  label: 'Edycja',
  type: 'action',
  action: 'edit',
};

const baseRow: ApplicationRow = {
  loanId: 'LN-1',
  customerName: 'Anna',
  status: 'new',
  market: 'PL',
  monthlyRate: 100,
  updatedAt: '2026-01-01T10:00:00Z',
  permissions: { canEdit: true },
};

function renderActionCell(row: ApplicationRow) {
  render(
    <table>
      <tbody>
        <tr>
          <TableDataCell column={editColumn} row={row} />
        </tr>
      </tbody>
    </table>,
  );
}

describe('TableDataCell (action column)', () => {
  it('renders an enabled edit button when permissions.canEdit is true', () => {
    renderActionCell(baseRow);

    expect(screen.getByRole('button', { name: 'Edycja' })).toBeEnabled();
  });

  it('renders a disabled edit button when permissions.canEdit is false', () => {
    renderActionCell({ ...baseRow, permissions: { canEdit: false } });

    expect(screen.getByRole('button', { name: 'Edycja' })).toBeDisabled();
  });
});
