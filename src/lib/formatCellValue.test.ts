import { describe, expect, it } from 'vitest';
import { formatAmount, formatDate } from './formatCellValue';

describe('formatDate', () => {
  it('formats ISO datetime for pl-PL', () => {
    expect(formatDate('2026-01-21T19:00:00Z')).toMatch(/21\.01\.2026/);
  });

  it('returns em dash for empty or invalid values', () => {
    expect(formatDate(null)).toBe('-');
    expect(formatDate(undefined)).toBe('-');
    expect(formatDate('')).toBe('-');
    expect(formatDate('not-a-date')).toBe('-');
  });
});

describe('formatAmount', () => {
  it('formats number with two fraction digits', () => {
    expect(formatAmount(1409.27)).toMatch(/1[\s\u00a0]?409,27/);
  });

  it('returns em dash for empty or invalid values', () => {
    expect(formatAmount(null)).toBe('-');
    expect(formatAmount(Number.NaN)).toBe('-');
    expect(formatAmount(0)).toBe('0,00');
  });
});
