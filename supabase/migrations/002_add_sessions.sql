-- Adds support for session-based locations (e.g. Harmony Church Preschool's
-- 4 school-quarter-style sessions) alongside the existing flat monthly
-- subscription locations (e.g. Sugarland). Run once in Supabase SQL Editor.

alter table locations
  add column if not exists pricing_mode text not null default 'monthly'
    check (pricing_mode in ('monthly', 'sessions'));
alter table locations add column if not exists full_year_price_cents integer;
alter table locations add column if not exists full_year_stripe_price_id text;

-- Meaningless for session-based locations, so it can no longer be required.
alter table locations alter column monthly_price_cents drop not null;

-- One row per session (e.g. "Session 1: Sept 14 - Nov 9"). This is the
-- table you'll edit in Table Editor to add/adjust a session's dates,
-- class count, or price.
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
alter table sessions enable row level security;

alter table enrollments add column if not exists session_id uuid references sessions(id);
alter table enrollments add column if not exists is_full_year boolean not null default false;
