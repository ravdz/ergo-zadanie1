import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import { Badge } from '../atoms/Badge';
import { RowActionButton } from '../atoms/RowActionButton';
import { Td } from '../atoms/Td';

type TableDataCellProps = {
  column: ColumnDefinition;
  row: ApplicationRow;
};

export function TableDataCell({ column, row }: TableDataCellProps) {
  const value = row[column.key as keyof ApplicationRow];

  switch (column.type) {
    case 'badge':
      return (
        <Td>
          <Badge label={String(value)} />
        </Td>
      );
    case 'action':
      return (
        <Td>
          <RowActionButton label={column.label} disabled />
        </Td>
      );
    default:
      return <Td>{value == null ? '—' : String(value)}</Td>;
  }
}
