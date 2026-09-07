import { supabaseAdmin } from "@/lib/supabase";
import { sendParentEmail } from "@/lib/email";
import { buildWelcomeEmail } from "@/lib/emailTemplates";
import {
  computeEarliestAttendanceDate,
  computeNextClassDate,
  oneEasternDayBefore,
  todayEasternMidnight,
} from "@/lib/classSchedule";

// Runs daily (see vercel.json). For every active enrollment that hasn't
// gotten its welcome email yet, works out when the child's first class
// actually is and sends the email the day before — catching up on any
// enrollment whose "day before" has already passed (e.g. a missed cron
// run) rather than skipping it.
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("Missing CRON_SECRET environment variable.");
    return Response.json({ error: "Cron not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const db = supabaseAdmin();
  const today = todayEasternMidnight();

  const { data: enrollments, error } = await db
    .from("enrollments")
    .select(
      "id, child_name, parent_email, created_at, location_id, session_id, is_full_year, locations(name, class_day, pricing_mode, first_billing_date), sessions(start_date)"
    )
    .eq("status", "active")
    .is("welcome_email_sent_at", null);

  if (error) {
    console.error("Failed to load enrollments for welcome email cron", error);
    return Response.json({ error: "Failed to load enrollments." }, { status: 500 });
  }

  let sent = 0;
  let skipped = 0;

  for (const enrollment of enrollments ?? []) {
    const row = enrollment as unknown as {
      id: string;
      child_name: string;
      parent_email: string;
      created_at: string;
      location_id: string;
      session_id: string | null;
      is_full_year: boolean;
      locations?: {
        name?: string;
        class_day: string | null;
        pricing_mode: string;
        first_billing_date: string | null;
      };
      sessions?: { start_date: string } | null;
    };

    const location = row.locations;
    if (!location?.class_day) {
      skipped++;
      continue;
    }

    let sessionStartDate: string | null = row.sessions?.start_date ?? null;

    // Full-year session-based signups have no single session_id — use
    // whichever session is current or next up at that location.
    if (location.pricing_mode === "sessions" && !sessionStartDate) {
      const todayIso = new Date(today * 1000).toISOString().slice(0, 10);
      const { data: upcomingSession } = await db
        .from("sessions")
        .select("start_date")
        .eq("location_id", row.location_id)
        .gte("end_date", todayIso)
        .order("start_date", { ascending: true })
        .limit(1)
        .maybeSingle();
      sessionStartDate = upcomingSession?.start_date ?? null;
    }

    const earliestAttendance = computeEarliestAttendanceDate({
      enrollmentCreatedAt: Math.floor(new Date(row.created_at).getTime() / 1000),
      firstBillingDate: location.first_billing_date,
      sessionStartDate,
    });

    const firstClassDate = computeNextClassDate(location.class_day, earliestAttendance);
    if (firstClassDate === null) {
      skipped++;
      continue;
    }

    const sendOn = oneEasternDayBefore(firstClassDate);
    if (sendOn > today) {
      // Not time yet.
      continue;
    }

    try {
      const email = buildWelcomeEmail({
        childName: row.child_name,
        locationName: location.name ?? "Soccer Cubs",
      });
      await sendParentEmail(row.parent_email, email.subject, email.html);
      await db
        .from("enrollments")
        .update({ welcome_email_sent_at: new Date().toISOString() })
        .eq("id", row.id);
      sent++;
    } catch (err) {
      console.error(`Failed to send welcome email for enrollment ${row.id}`, err);
    }
  }

  return Response.json({ sent, skipped, total: enrollments?.length ?? 0 });
}
