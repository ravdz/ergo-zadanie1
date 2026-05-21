import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import { TableDataCell } from './TableDataCell';

type TableRowProps = {
  columns: ColumnDefinition[];
  row: ApplicationRow;
};

export function TableRow({ columns, row }: TableRowProps) {
  return (
    <tr className="hover:bg-slate-50/80">
      {columns.map((column) => (
        <TableDataCell key={column.key} column={column} row={row} />
      ))}
    </tr>
  );
}
