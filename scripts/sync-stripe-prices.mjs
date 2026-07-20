// Run with: npm run stripe:sync
//
// Makes sure every active daycare location in Supabase has a matching
// Stripe recurring Price at the correct amount. Safe to re-run any time —
// if you change a location's monthly_price_cents in Supabase Table Editor,
// running this again creates a fresh Stripe Price for it (Stripe prices
// can't be edited once created) and points the location at the new one.
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

async function main() {
  const productId = await getOrCreateProduct();

  const { data: locations, error } = await supabase
    .from("locations")
    .select("id, name, monthly_price_cents, stripe_price_id")
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
    let needsNewPrice = !location.stripe_price_id;

    if (location.stripe_price_id) {
      try {
        const existingPrice = await stripe.prices.retrieve(location.stripe_price_id);
        if (existingPrice.unit_amount !== location.monthly_price_cents) {
          needsNewPrice = true;
        }
      } catch {
        needsNewPrice = true;
      }
    }

    if (!needsNewPrice) {
      console.log(`✓ ${location.name} — already in sync`);
      continue;
    }

    const newPrice = await stripe.prices.create({
      product: productId,
      unit_amount: location.monthly_price_cents,
      currency: "usd",
      recurring: { interval: "month" },
      nickname: location.name,
    });

    if (location.stripe_price_id) {
      await stripe.prices.update(location.stripe_price_id, { active: false });
    }

    const { error: updateError } = await supabase
      .from("locations")
      .update({ stripe_price_id: newPrice.id })
      .eq("id", location.id);

    if (updateError) {
      console.error(`Failed to save new price id for ${location.name}:`, updateError.message);
      continue;
    }

    console.log(
      `→ ${location.name} — created price ${newPrice.id} at $${(location.monthly_price_cents / 100).toFixed(2)}/mo`
    );
  }

  console.log("\nDone!");
}

main();
