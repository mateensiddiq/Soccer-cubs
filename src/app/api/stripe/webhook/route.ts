import Stripe from "stripe";
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
          stripe_subscription_id: session.subscription as string,
          status: "active",
        })
        .eq("id", enrollmentId)
        .select("child_name, parent_name, parent_email, location_id, locations(name)")
        .single();

      if (enrollment) {
        const locationName =
          (enrollment as unknown as { locations?: { name?: string } }).locations?.name ??
          "your daycare";

        // The enrollment is already saved as active above — a failed email
        // here shouldn't turn into a Stripe webhook retry loop, so we log
        // and move on rather than letting it throw.
        try {
          await sendParentEmail(
            enrollment.parent_email,
            "You're signed up for Soccer Cubs! ⚽",
            `
              <p>Hi ${enrollment.parent_name},</p>
              <p>${enrollment.child_name} is officially enrolled in Soccer Cubs at ${locationName}! We can't wait to see them on the field.</p>
              <p>You can manage your subscription anytime from the "Manage My Subscription" link on our website.</p>
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
