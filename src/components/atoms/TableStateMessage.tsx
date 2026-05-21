type TableStateMessageProps = {
  title: string;
  description?: string;
};

export function TableStateMessage({ title, description }: TableStateMessageProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
      <p className="font-medium text-slate-800">{title}</p>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
