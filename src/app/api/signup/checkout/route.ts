import { supabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { signupChildInfoSchema } from "@/lib/validation";
import { computeMonthlyBillingPlan } from "@/lib/monthlyBilling";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = signupChildInfoSchema.safeParse(json);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
      { status: 400 }
    );
  }

  const {
    locationId,
    sessionId,
    fullYear,
    classGroupId,
    childName,
    childDob,
    childAddress,
    childCity,
    childState,
    childZip,
    notes,
    parentName,
    parentEmail,
    parentPhone,
    parent2Name,
    parent2Phone,
    emergency1Name,
    emergency1Phone,
    emergency2Name,
    emergency2Phone,
  } = parsed.data;

  const db = supabaseAdmin();

  const { data: location, error: locationError } = await db
    .from("locations")
    .select(
      "id, name, active, pricing_mode, stripe_price_id, monthly_price_cents, full_year_price_cents, full_year_stripe_price_id, first_billing_date"
    )
    .eq("id", locationId)
    .single();

  if (locationError || !location || !location.active) {
    return Response.json({ error: "Location not found." }, { status: 404 });
  }

  // Figure out which Stripe price to charge and whether this is a
  // recurring subscription (monthly locations) or a one-time payment
  // (session-based locations).
  let stripePriceId: string | null;
  let mode: "subscription" | "payment";
  let sessionIdForEnrollment: string | null = null;
  let isFullYear = false;

  if (location.pricing_mode === "monthly") {
    stripePriceId = location.stripe_price_id;
    mode = "subscription";
  } else if (fullYear) {
    stripePriceId = location.full_year_stripe_price_id;
    mode = "payment";
    isFullYear = true;
  } else if (sessionId) {
    const { data: session, error: sessionError } = await db
      .from("sessions")
      .select("id, stripe_price_id, active, location_id")
      .eq("id", sessionId)
      .single();

    if (sessionError || !session || !session.active || session.location_id !== locationId) {
      return Response.json({ error: "Session not found." }, { status: 404 });
    }

    stripePriceId = session.stripe_price_id;
    mode = "payment";
    sessionIdForEnrollment = session.id;
  } else {
    return Response.json({ error: "Please choose a session." }, { status: 400 });
  }

  if (!stripePriceId) {
    return Response.json(
      {
        error:
          "This isn't set up for online payment yet. Please contact us and we'll help you enroll.",
      },
      { status: 400 }
    );
  }

  const { data: enrollment, error: enrollmentError } = await db
    .from("enrollments")
    .insert({
      location_id: locationId,
      session_id: sessionIdForEnrollment,
      is_full_year: isFullYear,
      class_group_id: classGroupId || null,
      child_name: childName,
      child_dob: childDob,
      child_address: childAddress,
      child_city: childCity,
      child_state: childState,
      child_zip: childZip,
      notes: notes || null,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone,
      parent2_name: parent2Name || null,
      parent2_phone: parent2Phone || null,
      emergency1_name: emergency1Name,
      emergency1_phone: emergency1Phone,
      emergency2_name: emergency2Name || null,
      emergency2_phone: emergency2Phone || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (enrollmentError || !enrollment) {
    console.error("Failed to create enrollment", enrollmentError);
    return Response.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }

  // For monthly locations, figure out whether the first charge should be
  // deferred (pre-launch), and whether this parent is signing up late
  // enough in the month to get a discounted or free partial first month.
  // See src/lib/monthlyBilling.ts for the exact policy.
  const billingPlan =
    mode === "subscription"
      ? computeMonthlyBillingPlan({
          first_billing_date: location.first_billing_date,
          monthly_price_cents: location.monthly_price_cents,
        })
      : {};

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [
      { price: stripePriceId, quantity: 1 },
      ...(billingPlan.immediateChargeCents
        ? [
            {
              price_data: {
                currency: "usd",
                unit_amount: billingPlan.immediateChargeCents,
                product_data: { name: "Prorated first month (50% off)" },
              },
              quantity: 1,
            },
          ]
        : []),
    ],
    customer_email: parentEmail,
    ...(mode === "payment" ? { customer_creation: "always" as const } : {}),
    client_reference_id: enrollment.id,
    ...(mode === "subscription"
      ? {
          subscription_data: {
            metadata: { enrollment_id: enrollment.id },
            ...(billingPlan.trialEnd ? { trial_end: billingPlan.trialEnd } : {}),
          },
        }
      : {}),
    metadata: { enrollment_id: enrollment.id },
    success_url: `${origin}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/signup`,
  });

  if (!session.url) {
    return Response.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ url: session.url });
}
