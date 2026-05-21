type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
      {label}
    </span>
  );
}
