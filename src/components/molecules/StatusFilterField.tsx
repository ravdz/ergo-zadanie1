type StatusFilterFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export function StatusFilterField({ label, value, options, onChange }: StatusFilterFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
      >
        <option value="">Wszystkie</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
