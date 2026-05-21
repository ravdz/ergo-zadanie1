import { memo } from 'react';
import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import { TableRow } from '../molecules/TableRow';

type TableBodyProps = {
  columns: ColumnDefinition[];
  rows: ApplicationRow[];
};

export const TableBody = memo(function TableBody({ columns, rows }: TableBodyProps) {
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow key={row.loanId} columns={columns} row={row} />
      ))}
    </tbody>
  );
});
