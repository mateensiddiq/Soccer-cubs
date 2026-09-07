import { easternDateParts, easternMidnight } from "./easternTime";

const WEEKDAY_NAMES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// Parses a location's `class_day` field (e.g. "Wednesdays", "Monday") into
// a 0-6 weekday index (0 = Sunday). Returns null if it doesn't look like a
// single weekday name.
function parseWeekday(classDay: string): number | null {
  const normalized = classDay.trim().toLowerCase().replace(/s$/, "");
  const idx = WEEKDAY_NAMES.indexOf(normalized);
  return idx === -1 ? null : idx;
}

function isoToEasternMidnight(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return easternMidnight(y, m, d);
}

// The earliest a child could plausibly attend a class: the latest of when
// they enrolled, when the location itself starts billing/running (if set
// and later), and when their specific session starts (if session-based).
export function computeEarliestAttendanceDate({
  enrollmentCreatedAt,
  firstBillingDate,
  sessionStartDate,
}: {
  enrollmentCreatedAt: number; // unix seconds
  firstBillingDate?: string | null; // ISO date
  sessionStartDate?: string | null; // ISO date
}): number {
  const candidates = [enrollmentCreatedAt];
  if (firstBillingDate) candidates.push(isoToEasternMidnight(firstBillingDate));
  if (sessionStartDate) candidates.push(isoToEasternMidnight(sessionStartDate));
  return Math.max(...candidates);
}

// The next date on or after `referenceUnixSeconds` that falls on the given
// weekday, as a unix-seconds timestamp at Eastern midnight. Null if
// `classDay` doesn't parse to a recognized weekday.
export function computeNextClassDate(
  classDay: string,
  referenceUnixSeconds: number
): number | null {
  const weekday = parseWeekday(classDay);
  if (weekday === null) return null;

  const { year, month, day } = easternDateParts(new Date(referenceUnixSeconds * 1000));
  const referenceWeekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const daysToAdd = (weekday - referenceWeekday + 7) % 7;

  const target = new Date(Date.UTC(year, month - 1, day + daysToAdd));
  return easternMidnight(target.getUTCFullYear(), target.getUTCMonth() + 1, target.getUTCDate());
}

// One calendar day before the given Eastern-midnight timestamp, computed via
// calendar arithmetic (not raw subtraction) so it's still correct across a
// DST transition.
export function oneEasternDayBefore(unixSeconds: number): number {
  const { year, month, day } = easternDateParts(new Date(unixSeconds * 1000));
  const prev = new Date(Date.UTC(year, month - 1, day - 1));
  return easternMidnight(prev.getUTCFullYear(), prev.getUTCMonth() + 1, prev.getUTCDate());
}

export function todayEasternMidnight(now: Date = new Date()): number {
  const { year, month, day } = easternDateParts(now);
  return easternMidnight(year, month, day);
}
