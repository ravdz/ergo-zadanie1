type RowActionButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function RowActionButton({ label, disabled = false, onClick }: RowActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded px-2 py-1 text-xs font-medium text-slate-700 enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
    >
      {label}
    </button>
  );
}
