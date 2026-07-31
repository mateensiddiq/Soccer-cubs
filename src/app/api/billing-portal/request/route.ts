import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { createBillingToken } from "@/lib/billingToken";
import { sendParentEmail, sendOwnerNotification } from "@/lib/email";

const bodySchema = z.object({
  email: z.string().trim().email(),
});

// Always responds with the same generic message whether or not the email
// matches an enrollment, so this endpoint can't be used to check who has
// signed up.
export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const genericResponse = Response.json({
    message:
      "If we found an account with that email, a link to manage your subscription is on its way.",
  });

  const { data: enrollment } = await supabaseAdmin()
    .from("enrollments")
    .select("stripe_customer_id, child_name, parent_name")
    .eq("parent_email", parsed.data.email)
    .not("stripe_customer_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!enrollment?.stripe_customer_id) {
    return genericResponse;
  }

  const token = createBillingToken(enrollment.stripe_customer_id);
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const link = `${origin}/billing/verify?token=${encodeURIComponent(token)}`;

  await sendParentEmail(
    parsed.data.email,
    "Manage your Soccer Cubs subscription",
    `
      <p>Here's your secure link to manage your Soccer Cubs subscription:</p>
      <p><a href="${link}">${link}</a></p>
      <p>This link expires in 15 minutes. If you didn't request this, you can ignore this email.</p>
    `
  );

  // Heads up for you — doesn't include the actual magic link, just who asked.
  try {
    await sendOwnerNotification(
      `${enrollment.parent_name} requested to manage their subscription`,
      `
        <p><strong>${enrollment.parent_name}</strong> (${parsed.data.email}) just requested a link to manage or cancel their subscription for <strong>${enrollment.child_name}</strong>.</p>
        <p>They were emailed a secure link directly — no action needed unless they reach out to you.</p>
      `
    );
  } catch (err) {
    console.error("Failed to send owner billing-request notification", err);
  }

  return genericResponse;
}
