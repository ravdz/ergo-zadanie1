const LOCALE = 'pl-PL';

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'short',
  timeStyle: 'short',
});

const amountFormatter = new Intl.NumberFormat(LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatText(value: unknown): string {
  if (value == null) {
    return '-';
  }

  return String(value);
}

export function formatDate(value: string | null | undefined): string {
  if (value == null || value === '') {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return dateFormatter.format(date);
}

export function formatAmount(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) {
    return '-';
  }

  return amountFormatter.format(value);
}
