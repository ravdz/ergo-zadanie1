import { describe, expect, it } from 'vitest';
import columnsData from '../data/columns.json';
import { findColumnByKey } from './columns';
import type { ColumnDefinition } from '../types/column';

const columns = columnsData as ColumnDefinition[];

describe('findColumnByKey', () => {
  it('returns column metadata for an existing key', () => {
    const column = findColumnByKey(columns, 'loanId');

    expect(column).toEqual(
      expect.objectContaining({
        key: 'loanId',
        label: 'ID wniosku',
        type: 'text',
      }),
    );
  });

  it('returns undefined for an unknown key', () => {
    expect(findColumnByKey(columns, 'missing')).toBeUndefined();
  });
});
