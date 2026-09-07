-- Tracks whether the "day before first class" welcome email has been sent
-- for an enrollment, so the daily cron job doesn't send it more than once.
-- Also used to backfill/mark enrollments that received the one-time launch
-- email directly, so the cron never re-sends to them.
alter table enrollments add column if not exists welcome_email_sent_at timestamptz;
