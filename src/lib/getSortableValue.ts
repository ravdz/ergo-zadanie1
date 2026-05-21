import type { ApplicationRow } from '../types/applicationRow';
import type { ColumnDefinition } from '../types/column';

export type SortableValue =
  | { kind: 'empty' }
  | { kind: 'text'; value: string }
  | { kind: 'number'; value: number };

export function getSortableValue(row: ApplicationRow, column: ColumnDefinition): SortableValue {
  const raw = row[column.key as keyof ApplicationRow];

  switch (column.type) {
    case 'text':
    case 'badge': {
      if (raw == null || (typeof raw === 'string' && raw.trim() === '')) {
        return { kind: 'empty' };
      }

      return { kind: 'text', value: String(raw).trim().toLocaleLowerCase('pl') };
    }
    case 'date': {
      if (raw == null || raw === '') {
        return { kind: 'empty' };
      }

      const timestamp = Date.parse(String(raw));

      if (Number.isNaN(timestamp)) {
        return { kind: 'empty' };
      }

      return { kind: 'number', value: timestamp };
    }
    case 'currency': {
      const amount = typeof raw === 'number' ? raw : Number(raw);

      if (raw == null || Number.isNaN(amount)) {
        return { kind: 'empty' };
      }

      return { kind: 'number', value: amount };
    }
    default:
      return { kind: 'empty' };
  }
}

export function compareSortableValues(
  left: SortableValue,
  right: SortableValue,
  direction: 'asc' | 'desc',
): number {
  const leftEmpty = left.kind === 'empty';
  const rightEmpty = right.kind === 'empty';

  if (leftEmpty && rightEmpty) {
    return 0;
  }

  if (leftEmpty) {
    return 1;
  }

  if (rightEmpty) {
    return -1;
  }

  let comparison = 0;

  if (left.kind === 'text' && right.kind === 'text') {
    comparison = left.value.localeCompare(right.value, 'pl');
  } else if (left.kind === 'number' && right.kind === 'number') {
    comparison = left.value - right.value;
  }

  return direction === 'asc' ? comparison : -comparison;
}
