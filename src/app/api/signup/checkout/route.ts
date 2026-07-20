import { supabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { signupChildInfoSchema } from "@/lib/validation";

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
    childName,
    childDob,
    notes,
    parentName,
    parentEmail,
    parentPhone,
  } = parsed.data;

  const db = supabaseAdmin();

  const { data: location, error: locationError } = await db
    .from("locations")
    .select("id, name, active, stripe_price_id")
    .eq("id", locationId)
    .single();

  if (locationError || !location || !location.active) {
    return Response.json({ error: "Location not found." }, { status: 404 });
  }

  if (!location.stripe_price_id) {
    return Response.json(
      {
        error:
          "This location isn't set up for online payment yet. Please contact us and we'll help you enroll.",
      },
      { status: 400 }
    );
  }

  const { data: enrollment, error: enrollmentError } = await db
    .from("enrollments")
    .insert({
      location_id: locationId,
      child_name: childName,
      child_dob: childDob,
      notes: notes || null,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone,
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

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: location.stripe_price_id, quantity: 1 }],
    customer_email: parentEmail,
    client_reference_id: enrollment.id,
    subscription_data: {
      metadata: { enrollment_id: enrollment.id },
    },
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
