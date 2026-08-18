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

type EnrollmentRow = {
  id: string;
  child_name: string;
  child_dob: string;
  status: string;
  class_group_id: string | null;
  session_id: string | null;
  is_full_year: boolean;
};

type Category = {
  key: string;
  label: string | null;
  enrollments: EnrollmentRow[];
};

export default async function RosterLocationPage({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  const { locationId } = await params;
  const db = supabaseAdmin();

  const { data: location } = await db
    .from("locations")
    .select("id, name, pricing_mode")
    .eq("id", locationId)
    .single();

  if (!location) notFound();

  const [{ data: enrollments }, { data: classGroups }, { data: sessions }] = await Promise.all([
    db
      .from("enrollments")
      .select("id, child_name, child_dob, status, class_group_id, session_id, is_full_year")
      .eq("location_id", locationId)
      .in("status", ["active", "past_due"])
      .order("child_name", { ascending: true }),
    db
      .from("class_groups")
      .select("id, label, display_order")
      .eq("location_id", locationId)
      .eq("active", true)
      .order("display_order", { ascending: true }),
    location.pricing_mode === "sessions"
      ? db
          .from("sessions")
          .select("id, name, display_order")
          .eq("location_id", locationId)
          .eq("active", true)
          .order("display_order", { ascending: true })
      : Promise.resolve({ data: [] as { id: string; name: string; display_order: number }[] }),
  ]);

  const allEnrollments = (enrollments ?? []) as EnrollmentRow[];
  let categories: Category[];

  if (location.pricing_mode === "sessions") {
    const bySession = new Map<string, EnrollmentRow[]>();
    const fullYear: EnrollmentRow[] = [];
    const unassigned: EnrollmentRow[] = [];
    for (const e of allEnrollments) {
      if (e.is_full_year) fullYear.push(e);
      else if (e.session_id) {
        if (!bySession.has(e.session_id)) bySession.set(e.session_id, []);
        bySession.get(e.session_id)!.push(e);
      } else unassigned.push(e);
    }
    categories = [
      ...(sessions ?? []).map((s) => ({
        key: s.id,
        label: s.name,
        enrollments: bySession.get(s.id) ?? [],
      })),
      ...(fullYear.length > 0 ? [{ key: "full-year", label: "Full Year", enrollments: fullYear }] : []),
      ...(unassigned.length > 0 ? [{ key: "unassigned", label: "Unassigned", enrollments: unassigned }] : []),
    ];
  } else if ((classGroups ?? []).length > 1) {
    const byGroup = new Map<string, EnrollmentRow[]>();
    const unassigned: EnrollmentRow[] = [];
    for (const e of allEnrollments) {
      if (e.class_group_id) {
        if (!byGroup.has(e.class_group_id)) byGroup.set(e.class_group_id, []);
        byGroup.get(e.class_group_id)!.push(e);
      } else unassigned.push(e);
    }
    categories = [
      ...(classGroups ?? []).map((g) => ({
        key: g.id,
        label: g.label,
        enrollments: byGroup.get(g.id) ?? [],
      })),
      ...(unassigned.length > 0 ? [{ key: "unassigned", label: "Unassigned", enrollments: unassigned }] : []),
    ];
  } else {
    categories = [{ key: "all", label: null, enrollments: allEnrollments }];
  }

  return (
    <div>
      <Link href="/admin/roster" className="text-sm font-semibold text-brown-soft hover:text-orange">
        ← All Schools
      </Link>
      <h1 className="mt-2 font-heading font-extrabold text-2xl text-brown">{location.name}</h1>
      <p className="mt-1 text-sm text-brown-soft">{allEnrollments.length} enrolled</p>

      <div className="mt-6 space-y-8">
        {allEnrollments.length === 0 && (
          <p className="text-sm text-brown-soft">No active players yet.</p>
        )}
        {allEnrollments.length > 0 &&
          categories.map((category) => (
            <div key={category.key}>
              {category.label && (
                <h2 className="font-heading font-bold text-brown mb-3 flex items-center gap-2">
                  {category.label}
                  <span className="text-xs font-semibold text-brown-soft bg-cream-dark rounded-full px-2 py-0.5">
                    {category.enrollments.length}
                  </span>
                </h2>
              )}
              <div className="space-y-3">
                {category.enrollments.length === 0 ? (
                  <p className="text-sm text-brown-soft">No one signed up here yet.</p>
                ) : (
                  category.enrollments.map((e) => (
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
                  ))
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
