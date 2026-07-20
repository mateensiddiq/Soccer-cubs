-- Soccer Cubs database schema
-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: uses "if not exists" / "or replace" where possible.

create extension if not exists "pgcrypto";

-- Daycare locations & their (private) monthly rates.
-- This is the table you'll edit by hand in Table Editor to add a daycare
-- or change a price later.
create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  contact_name text,
  active boolean not null default true,
  display_order integer not null default 0,
  monthly_price_cents integer not null,
  stripe_price_id text,
  created_at timestamptz not null default now()
);

-- One row per enrolled child, created automatically once payment succeeds.
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references locations(id),
  child_name text not null,
  child_dob date not null,
  notes text,
  parent_name text not null,
  parent_email text not null,
  parent_phone text,
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
alter table enrollments enable row level security;
alter table inquiries enable row level security;
