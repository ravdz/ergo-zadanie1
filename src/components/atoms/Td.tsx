import type { ComponentPropsWithoutRef } from 'react';

type TdProps = ComponentPropsWithoutRef<'td'>;

export function Td({ className = '', ...props }: TdProps) {
  return <td className={`border-b border-slate-100 px-3 py-2 ${className}`.trim()} {...props} />;
}
