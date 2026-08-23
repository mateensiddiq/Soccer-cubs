// Adds `months` calendar months to a unix-seconds timestamp, clamping the
// day-of-month to the last valid day of the target month (e.g. Jan 31 + 1
// month -> Feb 28/29, not Mar 3) — the same way Stripe's own billing-cycle
// anchor behaves, so a freeze's resume date lines up with the subscription's
// normal billing day.
export function addMonthsClamped(unixSeconds: number, months: number): number {
  const d = new Date(unixSeconds * 1000);
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();

  const targetIndex = month + months;
  const targetYear = year + Math.floor(targetIndex / 12);
  const targetMonth = ((targetIndex % 12) + 12) % 12;
  const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  const clampedDay = Math.min(day, daysInTargetMonth);

  return Math.floor(
    Date.UTC(
      targetYear,
      targetMonth,
      clampedDay,
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    ) / 1000
  );
}

export function formatFreezeDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
