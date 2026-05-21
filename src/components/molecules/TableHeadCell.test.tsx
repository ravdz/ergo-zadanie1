import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TableHeadCell } from './TableHeadCell';

function renderHeadCell(props: Partial<Parameters<typeof TableHeadCell>[0]>) {
  render(
    <table>
      <thead>
        <tr>
          <TableHeadCell
            columnKey="customerName"
            label="Klient"
            sortable={false}
            sortDirection={null}
            {...props}
          />
        </tr>
      </thead>
    </table>,
  );
}

describe('TableHeadCell (sortable column)', () => {
  it('renders a sort button and invokes onSort with the column key', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    renderHeadCell({ sortable: true, sortDirection: 'asc', onSort });

    await user.click(screen.getByRole('button', { name: /klient/i }));

    expect(onSort).toHaveBeenCalledTimes(1);
    expect(onSort).toHaveBeenCalledWith('customerName');
  });

  it('renders plain header text without a button when column is not sortable', () => {
    renderHeadCell({ sortable: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Klient')).toBeInTheDocument();
  });
});
