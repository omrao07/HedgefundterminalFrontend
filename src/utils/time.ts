// utils/time.ts
// Time, duration, and scheduling utilities
// No external dependencies, frontend & backend safe

/* =========================
   Constants
   ========================= */

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/* =========================
   Parsing & Conversion
   ========================= */

export function toDate(value: string | number | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

export function toTimestamp(value: string | number | Date): number {
  return toDate(value).getTime();
}

export function seconds(value: number): number {
  return value * SECOND;
}

export function minutes(value: number): number {
  return value * MINUTE;
}

export function hours(value: number): number {
  return value * HOUR;
}

export function days(value: number): number {
  return value * DAY;
}

/* =========================
   Duration Formatting
   ========================= */

export function formatDuration(ms: number): string {
  if (ms < 0) ms = Math.abs(ms);

  const d = Math.floor(ms / DAY);
  const h = Math.floor((ms % DAY) / HOUR);
  const m = Math.floor((ms % HOUR) / MINUTE);
  const s = Math.floor((ms % MINUTE) / SECOND);

  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function formatDurationVerbose(ms: number): string {
  if (ms < 0) ms = Math.abs(ms);

  const parts: string[] = [];

  const d = Math.floor(ms / DAY);
  const h = Math.floor((ms % DAY) / HOUR);
  const m = Math.floor((ms % HOUR) / MINUTE);
  const s = Math.floor((ms % MINUTE) / SECOND);

  if (d) parts.push(`${d} day${d !== 1 ? "s" : ""}`);
  if (h) parts.push(`${h} hour${h !== 1 ? "s" : ""}`);
  if (m) parts.push(`${m} minute${m !== 1 ? "s" : ""}`);
  if (s || parts.length === 0)
    parts.push(`${s} second${s !== 1 ? "s" : ""}`);

  return parts.join(", ");
}

/* =========================
   Time Differences
   ========================= */

export function diffMs(
  from: string | number | Date,
  to: string | number | Date = Date.now()
): number {
  return toTimestamp(to) - toTimestamp(from);
}

export function diffSeconds(
  from: string | number | Date,
  to?: string | number | Date
): number {
  return Math.floor(diffMs(from, to) / SECOND);
}

export function diffMinutes(
  from: string | number | Date,
  to?: string | number | Date
): number {
  return Math.floor(diffMs(from, to) / MINUTE);
}

export function diffHours(
  from: string | number | Date,
  to?: string | number | Date
): number {
  return Math.floor(diffMs(from, to) / HOUR);
}

/* =========================
   Comparisons
   ========================= */

export function isPast(value: string | number | Date): boolean {
  return toTimestamp(value) < Date.now();
}

export function isFuture(value: string | number | Date): boolean {
  return toTimestamp(value) > Date.now();
}

export function isWithin(
  value: string | number | Date,
  windowMs: number
): boolean {
  const now = Date.now();
  const ts = toTimestamp(value);
  return Math.abs(now - ts) <= windowMs;
}

/* =========================
   Scheduling Helpers
   ========================= */

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string = "Operation timed out"
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(message)),
      timeoutMs
    );

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/* =========================
   Tickers / Intervals
   ========================= */

export function createTicker(
  intervalMs: number,
  callback: () => void
): () => void {
  const id = setInterval(callback, intervalMs);
  return () => clearInterval(id);
}