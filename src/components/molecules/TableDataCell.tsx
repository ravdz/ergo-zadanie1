import type { ColumnDefinition } from '../../types/column';
import type { ApplicationRow } from '../../types/applicationRow';
import { formatAmount, formatDate, formatText } from '../../lib/formatCellValue';
import { isRowActionEnabled } from '../../lib/rowActions';
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
    case 'date':
      return (
        <Td>
          <time dateTime={typeof value === 'string' ? value : undefined}>
            {formatDate(value as string)}
          </time>
        </Td>
      );
    case 'currency':
      return <Td>{formatAmount(typeof value === 'number' ? value : Number(value))}</Td>;
    case 'action':
      return (
        <Td>
          <RowActionButton label={column.label} disabled={!isRowActionEnabled(row, column)} />
        </Td>
      );
    case 'text':
    default:
      return <Td>{formatText(value)}</Td>;
  }
}
