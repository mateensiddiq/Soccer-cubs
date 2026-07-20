import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getSecret() {
  const secret = process.env.BILLING_LINK_SECRET;
  if (!secret) {
    throw new Error("Missing BILLING_LINK_SECRET environment variable.");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createBillingToken(stripeCustomerId: string): string {
  const payload = JSON.stringify({
    customerId: stripeCustomerId,
    exp: Date.now() + TOKEN_TTL_MS,
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyBillingToken(token: string): string | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    if (typeof payload.customerId !== "string") return null;
    return payload.customerId;
  } catch {
    return null;
  }
}
