// Shared Eastern-time calendar helpers, used anywhere business logic needs
// to reason about "what day is it" from the parents'/coach's perspective
// (monthly billing cycles, class-day scheduling) rather than server-local
// or UTC time.

const EASTERN_TZ = "America/New_York";

export function easternDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

// The UTC offset (in minutes, negative for west of UTC) Eastern time is
// actually observing on the given date — i.e. -240 during EDT, -300 during
// EST — so callers don't have to guess which one applies.
function easternOffsetMinutes(approxUtc: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    timeZoneName: "shortOffset",
  }).formatToParts(approxUtc);
  const offsetName = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT-5";
  const match = offsetName.match(/GMT([+-]\d+)/);
  return match ? Number(match[1]) * 60 : -300;
}

// Midnight Eastern on the given calendar date, as a unix-seconds timestamp.
// Looks up the real EST/EDT offset for that date instead of guessing, so
// this stays correct across the DST boundary.
export function easternMidnight(year: number, month: number, day: number): number {
  // Noon UTC on the target date is always within the correct DST period for
  // that date (transitions happen at 2am local, never at/after noon UTC).
  const approxUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const offsetMinutes = easternOffsetMinutes(approxUtc);
  const utcMillis = Date.UTC(year, month - 1, day, 0, 0, 0) - offsetMinutes * 60000;
  return Math.floor(utcMillis / 1000);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
