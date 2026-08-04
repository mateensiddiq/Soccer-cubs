import Stripe from "stripe";
import { after } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOwnerNotification, sendParentEmail } from "@/lib/email";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable.");
    return Response.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
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
          "child_name, parent_name, parent_email, location_id, is_full_year, locations(name), sessions(name)"
        )
        .single();

      if (enrollment) {
        const enrollmentWithRelations = enrollment as unknown as {
          locations?: { name?: string };
          sessions?: { name?: string };
        };
        const locationName = enrollmentWithRelations.locations?.name ?? "your daycare";
        const origin = request.headers.get("origin") ?? new URL(request.url).origin;
        const billingUrl = `${origin}/billing`;

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
                <p>${enrollment.child_name} is officially enrolled in Soccer Cubs at ${locationName}${enrollmentDetail}! We can't wait to see them on the field.</p>
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
              `<p><strong>${enrollment.child_name}</strong> just enrolled at <strong>${locationName}</strong>.</p>
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
      await db
        .from("enrollments")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", subscription.id);
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
