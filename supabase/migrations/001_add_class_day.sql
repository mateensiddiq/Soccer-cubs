-- Adds a "which day of the week are classes" field to locations, shown on
-- the public Locations page. Run once in Supabase SQL Editor.
alter table locations add column if not exists class_day text;
