const currencyFormat = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const dateTimeFormat = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const relativeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatCurrency(value) {
  return currencyFormat.format(value ?? 0);
}

export function formatDate(value) {
  return value ? dateFormat.format(new Date(value)) : '-';
}

export function formatDateTime(value) {
  return value ? dateTimeFormat.format(new Date(value)) : '-';
}

// "2 hours ago", "yesterday"; falls back to a full date after 7 days.
export function formatRelativeTime(value) {
  if (!value) return '-';
  const diffSeconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
  if (Math.abs(diffSeconds) > 7 * 86400) return formatDate(value);

  const units = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, seconds] of units) {
    if (Math.abs(diffSeconds) >= seconds) {
      return relativeFormat.format(Math.round(diffSeconds / seconds), unit);
    }
  }
  return 'just now';
}