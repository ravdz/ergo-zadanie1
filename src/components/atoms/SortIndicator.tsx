import { ArrowUpDown, ArrowUpNarrowWide, ArrowDownNarrowWide } from 'lucide-react';

import type { SortDirection } from '../../types/sort';

export type { SortDirection };

type SortIndicatorProps = {
  direction: SortDirection;
};

export function SortIndicator({ direction }: SortIndicatorProps) {
  return (
    <span aria-hidden className="text-slate-600">
      {direction === 'asc' ? (
        <ArrowUpNarrowWide className="h-4 w-4" />
      ) : direction === 'desc' ? (
        <ArrowDownNarrowWide className="h-4 w-4" />
      ) : (
        <ArrowUpDown className="h-4 w-4" />
      )}
    </span>
  );
}
