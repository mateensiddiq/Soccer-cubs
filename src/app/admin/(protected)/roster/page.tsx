import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function RosterSchoolsPage() {
  const db = supabaseAdmin();

  const { data: locations } = await db
    .from("locations")
    .select("id, name, address")
    .order("display_order", { ascending: true });

  const { data: enrollments } = await db
    .from("enrollments")
    .select("location_id, status")
    .in("status", ["active", "past_due"]);

  const counts = new Map<string, number>();
  for (const e of enrollments ?? []) {
    counts.set(e.location_id, (counts.get(e.location_id) ?? 0) + 1);
  }

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-brown">Schools</h1>
      <div className="mt-6 space-y-3">
        {(locations ?? []).map((location) => (
          <Link
            key={location.id}
            href={`/admin/roster/${location.id}`}
            className="block bg-white rounded-2xl p-5 border-2 border-brown/10 shadow-sm hover:border-orange/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-bold text-lg text-brown">{location.name}</p>
                {location.address && (
                  <p className="text-sm text-brown-soft">{location.address}</p>
                )}
              </div>
              <span className="font-heading font-extrabold text-2xl text-orange">
                {counts.get(location.id) ?? 0}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
