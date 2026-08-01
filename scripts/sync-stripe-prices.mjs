// Run with: npm run stripe:sync
//
// Makes sure every active daycare location (and, for session-based
// locations, every active session + the full-year bundle) has a matching
// Stripe Price at the correct amount. Safe to re-run any time — if you
// change a price in Supabase Table Editor, running this again creates a
// fresh Stripe Price for it (Stripe prices can't be edited once created)
// and points the row at the new one.
import { readFileSync, writeFileSync, appendFileSync, existsSync } from "node:fs";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const required = [
  "STRIPE_SECRET_KEY",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key}. Add it to .env.local and try again.`);
    process.exit(1);
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getOrCreateProduct() {
  if (process.env.STRIPE_PRODUCT_ID) {
    return process.env.STRIPE_PRODUCT_ID;
  }

  console.log('No STRIPE_PRODUCT_ID found — creating the "Soccer Cubs Monthly" product...');
  const product = await stripe.products.create({ name: "Soccer Cubs Monthly" });

  const envPath = ".env.local";
  const assignment = `STRIPE_PRODUCT_ID=${product.id}`;
  if (existsSync(envPath)) {
    const contents = readFileSync(envPath, "utf8");
    if (/^STRIPE_PRODUCT_ID=.*$/m.test(contents)) {
      writeFileSync(envPath, contents.replace(/^STRIPE_PRODUCT_ID=.*$/m, assignment));
    } else {
      appendFileSync(envPath, `\n${assignment}\n`);
    }
    console.log(`Saved ${assignment} to .env.local`);
  } else {
    appendFileSync(envPath, `${assignment}\n`);
    console.log(`Created .env.local with ${assignment}`);
  }

  process.env.STRIPE_PRODUCT_ID = product.id;
  return product.id;
}

// Ensures a single Stripe Price matches `priceCents`, creating/archiving as
// needed, then writes the resulting price id back to `table`/`id` via
// `updateColumn`. `recurring` is `{ interval: "month" }` for subscriptions
// or `null` for one-time payments (sessions, full-year bundles).
async function syncPrice({ label, table, id, updateColumn, existingPriceId, priceCents, productId, recurring }) {
  let needsNewPrice = !existingPriceId;

  if (existingPriceId) {
    try {
      const existingPrice = await stripe.prices.retrieve(existingPriceId);
      if (existingPrice.unit_amount !== priceCents) {
        needsNewPrice = true;
      }
    } catch {
      needsNewPrice = true;
    }
  }

  if (!needsNewPrice) {
    console.log(`✓ ${label} — already in sync`);
    return;
  }

  const newPrice = await stripe.prices.create({
    product: productId,
    unit_amount: priceCents,
    currency: "usd",
    ...(recurring ? { recurring } : {}),
    nickname: label,
  });

  if (existingPriceId) {
    await stripe.prices.update(existingPriceId, { active: false });
  }

  const { error: updateError } = await supabase
    .from(table)
    .update({ [updateColumn]: newPrice.id })
    .eq("id", id);

  if (updateError) {
    console.error(`Failed to save new price id for ${label}:`, updateError.message);
    return;
  }

  const amount = `$${(priceCents / 100).toFixed(2)}`;
  console.log(`→ ${label} — created price ${newPrice.id} at ${amount}${recurring ? "/mo" : ""}`);
}

async function main() {
  const productId = await getOrCreateProduct();

  const { data: locations, error } = await supabase
    .from("locations")
    .select(
      "id, name, pricing_mode, monthly_price_cents, stripe_price_id, full_year_price_cents, full_year_stripe_price_id"
    )
    .eq("active", true);

  if (error) {
    console.error("Failed to load locations from Supabase:", error.message);
    process.exit(1);
  }

  if (!locations || locations.length === 0) {
    console.log("No active locations found in Supabase yet — nothing to sync.");
    return;
  }

  for (const location of locations) {
    if (location.pricing_mode === "monthly") {
      await syncPrice({
        label: location.name,
        table: "locations",
        id: location.id,
        updateColumn: "stripe_price_id",
        existingPriceId: location.stripe_price_id,
        priceCents: location.monthly_price_cents,
        productId,
        recurring: { interval: "month" },
      });
      continue;
    }

    // Session-based location: sync each active session, plus the
    // full-year bundle if one's configured.
    const { data: sessions, error: sessionsError } = await supabase
      .from("sessions")
      .select("id, name, price_cents, stripe_price_id")
      .eq("location_id", location.id)
      .eq("active", true);

    if (sessionsError) {
      console.error(`Failed to load sessions for ${location.name}:`, sessionsError.message);
      continue;
    }

    for (const session of sessions ?? []) {
      await syncPrice({
        label: `${location.name} — ${session.name}`,
        table: "sessions",
        id: session.id,
        updateColumn: "stripe_price_id",
        existingPriceId: session.stripe_price_id,
        priceCents: session.price_cents,
        productId,
        recurring: null,
      });
    }

    if (location.full_year_price_cents != null) {
      await syncPrice({
        label: `${location.name} — Full Year`,
        table: "locations",
        id: location.id,
        updateColumn: "full_year_stripe_price_id",
        existingPriceId: location.full_year_stripe_price_id,
        priceCents: location.full_year_price_cents,
        productId,
        recurring: null,
      });
    }
  }

  console.log("\nDone!");
}

main();
