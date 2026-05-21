type SearchFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function SearchField({ label, value, placeholder, onChange }: SearchFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
      />
    </label>
  );
}
