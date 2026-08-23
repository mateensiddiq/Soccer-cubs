import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { computeMonthlyBillingPlan, formatDate } from "@/lib/monthlyBilling";

const bodySchema = z.object({
  locationId: z.string().uuid(),
  sessionId: z.string().uuid().optional(),
  fullYear: z.boolean().optional(),
});

// This is the only endpoint that ever returns a price to the browser, and
// only for the single location/session the parent just selected — never a
// list of all locations' or sessions' prices.
export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { locationId, sessionId, fullYear } = parsed.data;
  const db = supabaseAdmin();

  const { data: location, error } = await db
    .from("locations")
    .select(
      "id, name, active, pricing_mode, monthly_price_cents, full_year_price_cents, first_billing_date"
    )
    .eq("id", locationId)
    .single();

  if (error || !location || !location.active) {
    return Response.json({ error: "Location not found." }, { status: 404 });
  }

  if (location.pricing_mode === "monthly") {
    const { billingNote } = computeMonthlyBillingPlan(location);
    return Response.json({
      label: location.name,
      priceCents: location.monthly_price_cents,
      billingNote,
    });
  }

  // Session-based location.
  if (fullYear) {
    if (location.full_year_price_cents == null) {
      return Response.json({ error: "Full-year option not available." }, { status: 400 });
    }
    return Response.json({
      label: "Full Year (all sessions)",
      priceCents: location.full_year_price_cents,
    });
  }

  if (!sessionId) {
    return Response.json({ error: "Please choose a session." }, { status: 400 });
  }

  const { data: session, error: sessionError } = await db
    .from("sessions")
    .select("id, name, start_date, end_date, price_cents, active, location_id")
    .eq("id", sessionId)
    .single();

  if (
    sessionError ||
    !session ||
    !session.active ||
    session.location_id !== locationId
  ) {
    return Response.json({ error: "Session not found." }, { status: 404 });
  }

  return Response.json({
    label: `${session.name} (${formatDate(session.start_date)} – ${formatDate(session.end_date)})`,
    priceCents: session.price_cents,
  });
}
