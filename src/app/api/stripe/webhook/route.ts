import Stripe from "stripe";
import { after } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOwnerNotification, sendParentEmail } from "@/lib/email";
import { computeMonthlyBillingPlan } from "@/lib/monthlyBilling";

// Live and test mode each sign with their own secret, even though both send
// to this same URL. STRIPE_WEBHOOK_SECRET_TEST is optional — set it to also
// accept test-mode events (e.g. for safely trying out changes) without ever
// touching STRIPE_WEBHOOK_SECRET, which is what verifies real live events.
function getWebhookSecrets(): string[] {
  return [process.env.STRIPE_WEBHOOK_SECRET, process.env.STRIPE_WEBHOOK_SECRET_TEST].filter(
    (secret): secret is string => Boolean(secret)
  );
}

export async function POST(request: Request) {
  const webhookSecrets = getWebhookSecrets();
  if (webhookSecrets.length === 0) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable.");
    return Response.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event | undefined;
  let verificationError: unknown;

  for (const secret of webhookSecrets) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, secret);
      break;
    } catch (err) {
      verificationError = err;
    }
  }

  if (!event) {
    console.error("Stripe webhook signature verification failed", verificationError);
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  const db = supabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const enrollmentId = session.metadata?.enrollment_id ?? session.client_reference_id;
      if (!enrollmentId) break;

      const { data: enrollment } = await db
        .from("enrollments")
        .update({
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: (session.subscription as string) ?? null,
          status: "active",
        })
        .eq("id", enrollmentId)
        .select(
          "child_name, parent_name, parent_email, location_id, is_full_year, created_at, locations(name, first_billing_date, monthly_price_cents), sessions(name), class_groups(label)"
        )
        .single();

      if (enrollment) {
        const enrollmentWithRelations = enrollment as unknown as {
          locations?: { name?: string; first_billing_date: string | null; monthly_price_cents: number | null };
          sessions?: { name?: string };
          class_groups?: { label?: string };
        };
        const locationName = enrollmentWithRelations.locations?.name ?? "your daycare";
        const groupLabel = enrollmentWithRelations.class_groups?.label;
        const origin = request.headers.get("origin") ?? new URL(request.url).origin;
        const billingUrl = `${origin}/billing`;
        const billingNote = enrollmentWithRelations.locations
          ? computeMonthlyBillingPlan(
              enrollmentWithRelations.locations,
              new Date(enrollment.created_at)
            ).billingNote
          : undefined;

        // Recurring monthly enrollments have a real subscription to manage;
        // one-time session/full-year payments don't, so don't point them at
        // a "manage subscription" page with nothing to show them.
        const isRecurring = Boolean(session.subscription);
        const enrollmentDetail = enrollment.is_full_year
          ? " for the full year"
          : enrollmentWithRelations.sessions?.name
            ? ` for ${enrollmentWithRelations.sessions.name}`
            : "";

        // Stripe expects a fast response to consider a webhook delivered —
        // the enrollment is already saved as active above, so send the
        // (slower, network-bound) emails after responding instead of
        // blocking on them. Blocking here previously caused real
        // deliveries to intermittently exceed Stripe's timeout and get
        // reported as failed, even though the enrollment itself saved fine.
        after(async () => {
          try {
            await sendParentEmail(
              enrollment.parent_email,
              "You're signed up for Soccer Cubs! ⚽",
              `
                <p>Hi ${enrollment.parent_name},</p>
                <p>${enrollment.child_name} is officially enrolled in Soccer Cubs at ${locationName}${enrollmentDetail}${groupLabel ? ` (${groupLabel})` : ""}! We can't wait to see them on the field.</p>
                ${billingNote ? `<p><strong>${billingNote}</strong></p>` : ""}
                ${
                  isRecurring
                    ? `<p>You can manage your subscription anytime from the <a href="${billingUrl}">Manage My Subscription</a> page.</p>`
                    : ""
                }
                <p>See you soon!<br/>Soccer Cubs</p>
              `
            );
          } catch (err) {
            console.error("Failed to send parent confirmation email", err);
          }

          try {
            await sendOwnerNotification(
              `New signup: ${enrollment.child_name}`,
              `<p><strong>${enrollment.child_name}</strong> just enrolled at <strong>${locationName}</strong>${groupLabel ? ` (${groupLabel})` : ""}.</p>
               <p>Parent: ${enrollment.parent_name} (${enrollment.parent_email})</p>`
            );
          } catch (err) {
            console.error("Failed to send owner notification email", err);
          }
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { data: enrollment } = await db
        .from("enrollments")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", subscription.id)
        .select("child_name, parent_name, parent_email, locations(name)")
        .single();

      if (enrollment) {
        const enrollmentWithLocation = enrollment as unknown as {
          locations?: { name?: string };
        };
        const locationName = enrollmentWithLocation.locations?.name ?? "Soccer Cubs";

        after(async () => {
          try {
            await sendOwnerNotification(
              `Subscription canceled: ${enrollment.child_name}`,
              `<p><strong>${enrollment.child_name}</strong>'s Soccer Cubs membership at <strong>${locationName}</strong> was just canceled.</p>
               <p>Parent: ${enrollment.parent_name} (${enrollment.parent_email})</p>`
            );
          } catch (err) {
            console.error("Failed to send subscription-canceled owner notification", err);
          }
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const status = subscription.status === "past_due" ? "past_due" : subscription.status === "active" ? "active" : null;
      if (status) {
        await db
          .from("enrollments")
          .update({ status })
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }

    default:
      break;
  }

  return Response.json({ received: true });
}
