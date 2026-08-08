-- Adds class-time groups (e.g. Sugarland's "Group 1: 2:30-3:00pm ages 2-3"
-- vs "Group 2: 3:15-3:45pm ages 4-5") and the extra registration fields
-- collected on the paper sign-up form (address, second parent, emergency
-- contacts). Run once in Supabase's SQL Editor.

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

alter table class_groups enable row level security;

alter table enrollments add column if not exists class_group_id uuid references class_groups(id);
alter table enrollments add column if not exists child_address text;
alter table enrollments add column if not exists child_city text;
alter table enrollments add column if not exists child_state text;
alter table enrollments add column if not exists child_zip text;
alter table enrollments add column if not exists parent2_name text;
alter table enrollments add column if not exists parent2_phone text;
alter table enrollments add column if not exists emergency1_name text not null default '';
alter table enrollments add column if not exists emergency1_phone text not null default '';
alter table enrollments add column if not exists emergency2_name text;
alter table enrollments add column if not exists emergency2_phone text;
