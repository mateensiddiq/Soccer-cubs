import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service role key, which bypasses
// row level security. This must never be imported from a Client Component
// or exposed to the browser — it's the only thing allowed to read location
// prices or write enrollments/inquiries. The `server-only` import above
// makes Next.js throw a build error if this ever ends up in a client bundle.
function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export const supabaseAdmin = getSupabaseAdmin;
