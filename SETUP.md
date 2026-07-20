# Soccer Cubs Website — Setup Guide

This is written for a non-technical setup. Follow it top to bottom the
first time; after that, the only thing you'll touch regularly is
**"Adding or editing a daycare location"** near the bottom.

Node.js is already installed on this computer (I installed it via
Homebrew while building this).

---

## 1. Create a Supabase project (the database)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Create a new project. Pick any name/region (choose a region close to
   Virginia, e.g. US East). Save the database password it gives you
   somewhere safe — you likely won't need it again, but just in case.
3. Once the project is ready, go to **Project Settings > API**. You'll
   need two values from this page later:
   - **Project URL** → this is `SUPABASE_URL`
   - **service_role secret key** (NOT the "anon public" key) → this is
     `SUPABASE_SERVICE_ROLE_KEY`
4. Go to the **SQL Editor** (left sidebar) > **New query**. Open the file
   `supabase/schema.sql` from this project, copy its entire contents,
   paste into the SQL editor, and click **Run**. This creates the three
   tables the site needs: `locations`, `enrollments`, `inquiries`.
5. (Optional, for testing only) Do the same with
   `supabase/seed-example.sql` to add two fake example daycare locations
   so you can click through the site before you have real ones. Delete
   these later from **Table Editor > locations**.

---

## 2. Create a Stripe account (payments)

1. Go to [stripe.com](https://stripe.com) and create an account.
2. You can build and test everything in **Test mode** (toggle in the top
   right of the Stripe dashboard) before ever entering real business
   details — no rush on the business verification step.
3. Go to **Developers > API keys**. Copy the **Secret key** (starts with
   `sk_test_...` in test mode) → this is `STRIPE_SECRET_KEY`.
4. You'll set up the webhook (`STRIPE_WEBHOOK_SECRET`) in step 5 below,
   after the site is deployed — Stripe needs a real web address to send
   webhooks to.

---

## 3. Create a Resend account (emails)

1. Go to [resend.com](https://resend.com) and create a free account.
2. Go to **API Keys** and create one → this is `RESEND_API_KEY`.
3. For real use, go to **Domains** and verify a domain you own (like
   `soccercubs.com`) so emails come from your own address. Until then,
   you can test with Resend's shared address
   `onboarding@resend.dev` — already set as the default in the example
   env file.

---

## 4. Fill in your environment variables

1. In the project folder, copy `.env.local.example` to a new file named
   `.env.local`.
2. Fill in the values you collected above:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `RESEND_API_KEY`, `EMAIL_FROM`
   - `OWNER_NOTIFICATION_EMAIL` → your own email, where inquiries and
     new-signup alerts should land
   - `BILLING_LINK_SECRET` → any long random string. You can generate one
     by running this in Terminal: `openssl rand -hex 32`
3. Leave `STRIPE_WEBHOOK_SECRET` and `STRIPE_PRODUCT_ID` blank for now —
   they get filled in during the next two steps.

`.env.local` is already set up to be ignored by git, so it will never
get uploaded anywhere — it's just for this computer/server.

---

## 5. Add your daycare locations and sync Stripe prices

1. In Supabase, go to **Table Editor > locations**. Click **Insert row**
   and add each daycare: its name, address, and `monthly_price_cents`
   (e.g. a $95/month rate = `9500`). Leave `stripe_price_id` blank —
   the next step fills it in automatically. Make sure `active` is
   checked (true).
2. In Terminal, from the project folder, run:
   ```
   npm run stripe:sync
   ```
   The first time you run this, it creates a "Soccer Cubs Monthly"
   product in Stripe and saves its ID into `.env.local` automatically.
   Then it creates a Stripe price for every location and saves each
   `stripe_price_id` back into Supabase. You'll see a line printed for
   each location.
3. **Whenever you change a price for a location in Supabase later, run
   `npm run stripe:sync` again** to keep Stripe in sync. It only creates
   new prices for locations that changed — everything else is skipped.

---

## 6. Run it locally to test

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click through the
site, then try **Sign Up** end-to-end using one of your locations and a
[Stripe test card](https://stripe.com/docs/testing) like:
- Card number: `4242 4242 4242 4242`
- Any future expiry date, any 3-digit CVC, any ZIP

You won't be charged real money in test mode. After a successful test
payment, check:
- Supabase **Table Editor > enrollments** — a new row with `status:
  active`
- Your `OWNER_NOTIFICATION_EMAIL` inbox — a new-signup notification
- The email address you signed up with — a confirmation email

The Stripe webhook (needed for the enrollment to actually update after
payment) won't fire on `localhost` unless you use the Stripe CLI's
`stripe listen` command — that's optional for local testing but
required once deployed (see below).

---

## 7. Deploying so the site is live

### Push the code to GitHub
1. Create a free [GitHub](https://github.com) account if you don't have
   one, and create a new empty repository (don't add a README).
2. In Terminal, from the project folder:
   ```
   git add -A
   git commit -m "Initial site"
   git remote add origin <the URL GitHub gives you>
   git push -u origin main
   ```

### Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up using your GitHub
   account.
2. Click **Add New > Project**, pick this repository, and click
   **Deploy**. It will fail the first time — that's expected, because
   the environment variables aren't set yet.
3. Go to the project's **Settings > Environment Variables** and add
   every variable from your `.env.local` file (same names, same
   values — except see the webhook note below). Redeploy.
4. Vercel gives you a URL like `soccer-cubs-website.vercel.app` — the
   site is now live there.

### Connect your Porkbun domain
1. In Vercel, go to your project's **Settings > Domains** and add your
   domain (e.g. `soccercubs.com`).
2. Vercel will show you one or two DNS records to add (usually an `A`
   record for the root domain and a `CNAME` for `www`).
3. Log into [Porkbun](https://porkbun.com), go to your domain's **DNS**
   settings, and add exactly the records Vercel showed you.
4. DNS changes can take anywhere from a few minutes to a few hours to
   take effect. Vercel's Domains page will show a green checkmark once
   it's live.

### Set up the real Stripe webhook
1. In the Stripe dashboard, go to **Developers > Webhooks > Add
   endpoint**.
2. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
3. Select these events: `checkout.session.completed`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
4. After creating it, click into the endpoint and copy the **Signing
   secret** (starts with `whsec_...`) → this is `STRIPE_WEBHOOK_SECRET`.
   Add it to Vercel's environment variables and redeploy.

### Go live with real payments
When you're ready to accept real money:
1. In Stripe, finish business verification and switch off **Test mode**.
2. Get your **live** secret key (`sk_live_...`) from Developers > API
   keys and swap it into `STRIPE_SECRET_KEY` in Vercel.
3. Run `npm run stripe:sync` again locally with the live key in
   `.env.local` — this recreates your prices in live mode (test-mode and
   live-mode data are completely separate in Stripe).
4. Set up the webhook endpoint again in live mode (step above), and
   update `STRIPE_WEBHOOK_SECRET` in Vercel.
5. Redeploy.

---

## Ongoing: adding or editing a daycare location

This is the only step you'll repeat regularly, and it's all done in
your browser — no code required:

1. Go to your Supabase project > **Table Editor > locations**.
2. **New location:** click **Insert row**, fill in name, address,
   `monthly_price_cents`, make sure `active` is checked.
3. **Price change:** edit `monthly_price_cents` on the existing row.
4. Either way, run `npm run stripe:sync` once afterward (from the
   project folder, with `.env.local` filled in) to keep Stripe in sync.
   Ask me for help running this if you're not near your computer with
   the project set up.
5. To temporarily hide a location from sign-up without deleting it,
   uncheck `active`.
