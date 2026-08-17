-- Soccer Cubs database schema
-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: uses "if not exists" / "or replace" where possible.

create extension if not exists "pgcrypto";

-- Daycare locations & their (private) rates. Most locations bill a flat
-- monthly subscription ("monthly"); some (like a preschool running
-- school-quarter-style sessions) instead sell fixed-price "sessions" —
-- see the sessions table below. This is the table you'll edit by hand in
-- Table Editor to add a daycare or change a price later.
create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  contact_name text,
  class_day text,
  active boolean not null default true,
  display_order integer not null default 0,
  pricing_mode text not null default 'monthly' check (pricing_mode in ('monthly', 'sessions')),
  monthly_price_cents integer,
  stripe_price_id text,
  full_year_price_cents integer,
  full_year_stripe_price_id text,
  -- If set (and in the future), a monthly location's first Stripe charge
  -- is deferred to this date instead of billing immediately on signup.
  -- Ignored once the date has passed.
  first_billing_date date,
  created_at timestamptz not null default now()
);

-- One row per session (e.g. "Session 1: Sept 14 - Nov 9"), only used by
-- locations with pricing_mode = 'sessions'.
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id),
  name text not null,
  start_date date not null,
  end_date date not null,
  class_count integer not null,
  price_cents integer not null,
  stripe_price_id text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- One row per named class time at a location (e.g. Sugarland's "Group 1:
-- 2:30-3:00pm, ages 2-3" and "Group 2: 3:15-3:45pm, ages 4-5"; Harmony's
-- single "After School" class). A location with only one active group
-- doesn't need a picker on the sign-up form — it's assumed automatically.
create table if not exists class_groups (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id),
  label text not null,
  age_range text,
  time_range text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- One row per enrolled child, created automatically once payment succeeds.
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id),
  session_id uuid references sessions(id),
  is_full_year boolean not null default false,
  class_group_id uuid references class_groups(id),
  child_name text not null,
  child_dob date not null,
  child_address text,
  child_city text,
  child_state text,
  child_zip text,
  notes text,
  parent_name text not null,
  parent_email text not null,
  parent_phone text,
  parent2_name text,
  parent2_phone text,
  emergency1_name text not null default '',
  emergency1_phone text not null default '',
  emergency2_name text,
  emergency2_phone text,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Contact form + birthday/event inquiry submissions.
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'birthday')),
  name text not null,
  email text not null,
  phone text,
  event_date date,
  message text,
  created_at timestamptz not null default now()
);

-- Lock every table down completely at the database level. The site never
-- talks to Supabase from the browser — every read/write goes through a
-- Next.js server route using the service role key, so no public policies
-- are defined here on purpose. This is what keeps location prices out of
-- anything a parent's browser can see before they're supposed to.
alter table locations enable row level security;
alter table sessions enable row level security;
alter table class_groups enable row level security;
alter table enrollments enable row level security;
alter table inquiries enable row level security;
