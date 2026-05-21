import { ChevronUp, ChevronDown } from 'lucide-react';

export type SortDirection = 'asc' | 'desc' | null;

type SortIndicatorProps = {
  direction: SortDirection;
};

export function SortIndicator({ direction }: SortIndicatorProps) {
  if (direction === null) {
    return <span aria-hidden className="text-slate-400" />;
  }

  return (
    <span aria-hidden className="text-slate-600">
      {direction === 'asc' ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </span>
  );
}
