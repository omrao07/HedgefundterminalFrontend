// utils/format.ts
// Centralized formatting utilities (dates, numbers, units, labels)
// No external dependencies, frontend & backend safe

/* =========================
   Date & Time
   ========================= */

export function formatDate(
  value: string | number | Date,
  locale: string = "en-IN",
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  }).format(date);
}

export function formatDateTime(
  value: string | number | Date,
  locale: string = "en-IN"
): string {
  return formatDate(value, locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatRelativeTime(
  value: string | number | Date
): string {
  const date = value instanceof Date ? value : new Date(value);
  const diffMs = date.getTime() - Date.now();

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const seconds = Math.round(diffMs / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (Math.abs(seconds) < 60) return rtf.format(seconds, "second");
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");

  return rtf.format(days, "day");
}

/* =========================
   Numbers & Currency
   ========================= */

export function formatNumber(
  value: number,
  locale: string = "en-IN",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(
  value: number,
  currency: string = "INR",
  locale: string = "en-IN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(
  value: number,
  fractionDigits: number = 1
): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/* =========================
   Units & Measurements
   ========================= */

export function formatDistanceMeters(
  meters: number
): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}

export function formatAltitudeMeters(
  meters: number
): string {
  return `${Math.round(meters)} m AGL`;
}

export function formatSpeedMps(
  mps: number
): string {
  return `${(mps * 3.6).toFixed(1)} km/h`;
}

/* =========================
   Text & Labels
   ========================= */

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatEnumLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function truncate(
  value: string,
  maxLength: number
): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}