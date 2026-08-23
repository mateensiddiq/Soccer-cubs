import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ManageSubscriptionPanel, {
  type Membership,
} from "@/components/ManageSubscriptionPanel";
import { verifyBillingToken } from "@/lib/billingToken";
import { supabaseAdmin } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { addMonthsClamped, formatFreezeDate } from "@/lib/subscriptionFreeze";

export const metadata: Metadata = {
  title: "Manage My Subscription | Soccer Cubs",
};

export default async function ManageSubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const customerId = token ? verifyBillingToken(token) : null;

  if (!token || !customerId) {
    redirect("/billing?error=expired");
  }

  const db = supabaseAdmin();
  const { data: enrollments } = await db
    .from("enrollments")
    .select("id, child_name, stripe_subscription_id, locations(name)")
    .eq("stripe_customer_id", customerId)
    .not("stripe_subscription_id", "is", null)
    .in("status", ["active", "past_due"])
    .order("created_at", { ascending: false });

  const stripe = getStripe();

  const memberships: Membership[] = await Promise.all(
    (enrollments ?? []).map(async (enrollment) => {
      const row = enrollment as unknown as {
        id: string;
        child_name: string;
        stripe_subscription_id: string;
        locations?: { name?: string };
      };
      const subscription = await stripe.subscriptions.retrieve(row.stripe_subscription_id);
      const currentPeriodEnd = subscription.items.data[0]?.current_period_end ?? null;

      return {
        subscriptionId: row.stripe_subscription_id,
        childName: row.child_name,
        locationName: row.locations?.name ?? "Soccer Cubs",
        isFrozen: Boolean(subscription.pause_collection),
        resumesAtLabel: subscription.pause_collection?.resumes_at
          ? formatFreezeDate(subscription.pause_collection.resumes_at)
          : null,
        nextBillingLabel: currentPeriodEnd ? formatFreezeDate(currentPeriodEnd) : null,
        freezeOneLabel: currentPeriodEnd
          ? formatFreezeDate(addMonthsClamped(currentPeriodEnd, 1))
          : null,
        freezeTwoLabel: currentPeriodEnd
          ? formatFreezeDate(addMonthsClamped(currentPeriodEnd, 2))
          : null,
      };
    })
  );

  return (
    <div>
      <PageHero
        eyebrow="MANAGE SUBSCRIPTION"
        title="Manage my subscription"
        subtitle="Freeze your membership for a month or two, update your payment method, or cancel — all from here."
      />
      <section className="py-14">
        <Container className="max-w-2xl">
          <ManageSubscriptionPanel token={token} memberships={memberships} />
        </Container>
      </section>
    </div>
  );
}
