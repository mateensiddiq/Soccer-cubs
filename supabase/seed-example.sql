-- Optional: run this after schema.sql to add a couple of example locations
-- so you can test the sign-up flow before your real partner daycares are
-- entered. Delete these rows from the "locations" table in Table Editor
-- whenever you're ready to go live with real ones.

insert into locations (name, address, active, display_order, monthly_price_cents)
values
  ('Sunny Days Daycare (example)', 'Arlington, VA', true, 1, 8900),
  ('Little Explorers Learning Center (example)', 'Fairfax, VA', true, 2, 9500);
