import { verifyBillingToken } from "@/lib/billingToken";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return Response.redirect(`${url.origin}/billing?error=missing_token`, 302);
  }

  const customerId = verifyBillingToken(token);
  if (!customerId) {
    return Response.redirect(`${url.origin}/billing?error=expired`, 302);
  }

  const stripe = getStripe();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${url.origin}/billing`,
    // Ensures "cancel" always takes effect at the end of the current paid
    // period, never immediately — a parent keeps the month they paid for.
    configuration: process.env.STRIPE_PORTAL_CONFIGURATION_ID,
  });

  return Response.redirect(portalSession.url, 302);
}
