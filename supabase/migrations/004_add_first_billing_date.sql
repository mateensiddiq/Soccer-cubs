-- Lets a monthly location's first Stripe charge be deferred to a future
-- date (e.g. a location signed up mid-summer shouldn't start billing
-- until the program actually starts in September). Leave this null for
-- normal "charge immediately on signup" behavior. Once the date passes,
-- it's automatically ignored, so it's safe to leave set after the fact.
alter table locations add column if not exists first_billing_date date;
