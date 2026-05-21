import { describe, expect, it } from 'vitest';
import { resolvePanelState } from './useApplicationsTableView';

describe('resolvePanelState', () => {
  it('returns empty when filters remove all rows but data was loaded', () => {
    expect(resolvePanelState('success', 10, 0)).toBe('empty');
  });

  it('keeps loading and error states unchanged', () => {
    expect(resolvePanelState('loading', 0, 0)).toBe('loading');
    expect(resolvePanelState('error', 10, 0)).toBe('error');
  });
});
