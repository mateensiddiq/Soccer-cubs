import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { verifyBillingToken } from "@/lib/billingToken";

const bodySchema = z.object({ token: z.string() });

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const customerId = verifyBillingToken(parsed.data.token);
  if (!customerId) {
    return Response.json(
      { error: "Your session has expired. Please request a new link." },
      { status: 401 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const stripe = getStripe();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/billing/manage?token=${encodeURIComponent(parsed.data.token)}`,
    // Ensures "cancel" always takes effect at the end of the current paid
    // period, never immediately — a parent keeps the month they paid for.
    configuration: process.env.STRIPE_PORTAL_CONFIGURATION_ID,
  });

  return Response.json({ url: portalSession.url });
}
