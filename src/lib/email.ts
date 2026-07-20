import "server-only";
import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(apiKey);
}

// Where inquiry/signup notifications get sent — set this to your own inbox.
function getOwnerEmail() {
  const email = process.env.OWNER_NOTIFICATION_EMAIL;
  if (!email) {
    throw new Error("Missing OWNER_NOTIFICATION_EMAIL environment variable.");
  }
  return email;
}

// The "from" address must be on a domain you've verified in Resend.
// Falls back to Resend's shared sandbox sender for local testing.
function getFromAddress() {
  return process.env.EMAIL_FROM || "Soccer Cubs <onboarding@resend.dev>";
}

export async function sendOwnerNotification(subject: string, html: string) {
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: getOwnerEmail(),
    subject,
    html,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}

export async function sendParentEmail(to: string, subject: string, html: string) {
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to,
    subject,
    html,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}
