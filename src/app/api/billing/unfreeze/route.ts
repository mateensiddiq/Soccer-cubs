import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { verifyBillingToken } from "@/lib/billingToken";

const bodySchema = z.object({
  token: z.string(),
  subscriptionId: z.string(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { token, subscriptionId } = parsed.data;
  const customerId = verifyBillingToken(token);
  if (!customerId) {
    return Response.json(
      { error: "Your session has expired. Please request a new link." },
      { status: 401 }
    );
  }

  const db = supabaseAdmin();
  const { data: enrollment } = await db
    .from("enrollments")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .eq("stripe_subscription_id", subscriptionId)
    .in("status", ["active", "past_due"])
    .maybeSingle();

  if (!enrollment) {
    return Response.json({ error: "We couldn't find that membership." }, { status: 404 });
  }

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (!subscription.pause_collection) {
    return Response.json({ error: "This membership isn't frozen." }, { status: 400 });
  }

  await stripe.subscriptions.update(subscriptionId, { pause_collection: "" });

  return Response.json({ ok: true });
}
