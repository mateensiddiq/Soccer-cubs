import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { verifyBillingToken } from "@/lib/billingToken";
import { addMonthsClamped, formatFreezeDate } from "@/lib/subscriptionFreeze";
import { sendParentEmail } from "@/lib/email";

const bodySchema = z.object({
  token: z.string(),
  subscriptionId: z.string(),
  months: z.union([z.literal(1), z.literal(2)]),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { token, subscriptionId, months } = parsed.data;
  const customerId = verifyBillingToken(token);
  if (!customerId) {
    return Response.json(
      { error: "Your session has expired. Please request a new link." },
      { status: 401 }
    );
  }

  // Only allow freezing a subscription that actually belongs to this
  // customer — the token proves the requester owns customerId, but not
  // which subscription they're allowed to touch.
  const db = supabaseAdmin();
  const { data: enrollment } = await db
    .from("enrollments")
    .select("parent_email, parent_name, child_name")
    .eq("stripe_customer_id", customerId)
    .eq("stripe_subscription_id", subscriptionId)
    .in("status", ["active", "past_due"])
    .maybeSingle();

  if (!enrollment) {
    return Response.json({ error: "We couldn't find that membership." }, { status: 404 });
  }

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (subscription.pause_collection) {
    return Response.json({ error: "This membership is already frozen." }, { status: 400 });
  }

  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  if (!currentPeriodEnd) {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  const resumesAt = addMonthsClamped(currentPeriodEnd, months);

  await stripe.subscriptions.update(subscriptionId, {
    pause_collection: { behavior: "void", resumes_at: resumesAt },
  });

  const resumeLabel = formatFreezeDate(resumesAt);
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    await sendParentEmail(
      enrollment.parent_email,
      "Your Soccer Cubs membership is frozen",
      `
        <p>Hi ${enrollment.parent_name},</p>
        <p>${enrollment.child_name}'s Soccer Cubs membership is now frozen for ${months} month${months > 1 ? "s" : ""}. You won't be charged again until billing resumes on ${resumeLabel}.</p>
        <p>You can unfreeze anytime from the <a href="${origin}/billing">Manage My Subscription</a> page.</p>
      `
    );
  } catch (err) {
    console.error("Failed to send freeze confirmation email", err);
  }

  return Response.json({ resumesAt, resumeLabel });
}
