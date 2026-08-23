// Billing logic for "monthly" pricing_mode locations (currently Sugarland
// Learning Academy and Kiddie Academy of Leesburg), shared between the quote
// endpoint (which only ever describes a price to the browser) and the
// checkout endpoint (which actually creates the Stripe subscription).
//
// Two separate policies, checked in order:
//
// 1. Pre-launch: if the location has a future `first_billing_date`, nobody
//    is charged until that date — the subscription is created now (card
//    saved) but its first invoice is deferred via `trial_end`.
//
// 2. Once billing is live (no `first_billing_date`, or it's in the past),
//    a parent signing up mid-month only gets part of the month's classes,
//    so they're billed less for that first, partial month:
//      - Day 1-17: normal, charged the full monthly price today.
//      - Day 18-24: 50% off, charged today, for whatever's left of this
//        month; then the full price starting the 1st of next month.
//      - Day 25-end: free for the rest of this month; then the full price
//        starting the 1st of next month.

const EASTERN_TZ = "America/New_York";

function easternDateParts(date: Date) {
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
function easternMidnight(year: number, month: number, day: number): number {
  // Noon UTC on the target date is always within the correct DST period for
  // that date (transitions happen at 2am local, never at/after noon UTC).
  const approxUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const offsetMinutes = easternOffsetMinutes(approxUtc);
  const utcMillis = Date.UTC(year, month - 1, day, 0, 0, 0) - offsetMinutes * 60000;
  return Math.floor(utcMillis / 1000);
}

function firstOfNextMonthEastern(now: Date): { unix: number; iso: string } {
  const { year, month } = easternDateParts(now);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const iso = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;
  return { unix: easternMidnight(nextYear, nextMonth, 1), iso };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatMoney(cents: number) {
  const amount = cents / 100;
  return amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);
}

export interface MonthlyBillingPlan {
  /** Unix-seconds timestamp to pass as the subscription's `trial_end`. */
  trialEnd?: number;
  /** Cents to charge today as a one-time line item alongside the subscription. */
  immediateChargeCents?: number;
  /** Parent-facing message describing the above, shown at checkout and in the confirmation email. */
  billingNote?: string;
}

export function computeMonthlyBillingPlan(
  location: { first_billing_date: string | null; monthly_price_cents: number | null },
  now: Date = new Date()
): MonthlyBillingPlan {
  if (location.first_billing_date) {
    const [y, m, d] = location.first_billing_date.split("-").map(Number);
    const billingStart = easternMidnight(y, m, d);
    if (billingStart * 1000 > now.getTime()) {
      return {
        trialEnd: billingStart,
        billingNote: `First charge on ${formatDate(location.first_billing_date)}, then monthly after that.`,
      };
    }
  }

  const price = location.monthly_price_cents;
  if (price == null) return {};

  const { day } = easternDateParts(now);
  const { unix: nextMonthUnix, iso: nextMonthIso } = firstOfNextMonthEastern(now);
  const nextMonthLabel = formatDate(nextMonthIso);
  const fullPriceLabel = formatMoney(price);

  if (day >= 25) {
    return {
      trialEnd: nextMonthUnix,
      billingNote: `Free trial for the rest of this month — any classes your child attends this month are on us. Then $${fullPriceLabel}/mo starting ${nextMonthLabel}.`,
    };
  }

  if (day >= 18) {
    const discountedCents = Math.round(price / 2);
    return {
      trialEnd: nextMonthUnix,
      immediateChargeCents: discountedCents,
      billingNote: `50% off your first month — pay $${formatMoney(discountedCents)} today for any classes this month, then $${fullPriceLabel}/mo starting ${nextMonthLabel}.`,
    };
  }

  return {};
}
