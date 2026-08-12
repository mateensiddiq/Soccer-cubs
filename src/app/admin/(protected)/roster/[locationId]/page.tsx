import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function formatAge(dob: string): string {
  const birth = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return "";
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  if (years < 1) return `${months} mo`;
  return months === 0 ? `${years} yr` : `${years} yr ${months} mo`;
}

export default async function RosterLocationPage({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  const { locationId } = await params;
  const db = supabaseAdmin();

  const { data: location } = await db
    .from("locations")
    .select("id, name")
    .eq("id", locationId)
    .single();

  if (!location) notFound();

  const { data: enrollments } = await db
    .from("enrollments")
    .select("id, child_name, child_dob, status")
    .eq("location_id", locationId)
    .in("status", ["active", "past_due"])
    .order("child_name", { ascending: true });

  return (
    <div>
      <Link href="/admin/roster" className="text-sm font-semibold text-brown-soft hover:text-orange">
        ← All Schools
      </Link>
      <h1 className="mt-2 font-heading font-extrabold text-2xl text-brown">{location.name}</h1>
      <p className="mt-1 text-sm text-brown-soft">
        {enrollments?.length ?? 0} enrolled
      </p>

      <div className="mt-6 space-y-3">
        {(enrollments ?? []).length === 0 && (
          <p className="text-sm text-brown-soft">No active players yet.</p>
        )}
        {(enrollments ?? []).map((e) => (
          <Link
            key={e.id}
            href={`/admin/roster/${locationId}/${e.id}`}
            className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 border-2 border-brown/10 shadow-sm hover:border-orange/40 transition-colors"
          >
            <div>
              <p className="font-heading font-bold text-brown">{e.child_name}</p>
              <p className="text-sm text-brown-soft">{formatAge(e.child_dob)}</p>
            </div>
            {e.status === "past_due" && (
              <span className="text-xs font-bold text-white bg-orange-dark rounded-full px-3 py-1">
                Past Due
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
