import type { ComponentPropsWithoutRef } from 'react';

type ThProps = ComponentPropsWithoutRef<'th'>;

export function Th({ className = '', ...props }: ThProps) {
  return (
    <th
      scope="col"
      className={`border-b border-slate-200 bg-slate-50 px-3 py-2 font-medium text-slate-700 ${className}`.trim()}
      {...props}
    />
  );
}
