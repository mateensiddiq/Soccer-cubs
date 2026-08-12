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

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-brown-soft">{label}</p>
      <p className="text-brown">{value}</p>
    </div>
  );
}

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ locationId: string; enrollmentId: string }>;
}) {
  const { locationId, enrollmentId } = await params;
  const db = supabaseAdmin();

  const { data: enrollment } = await db
    .from("enrollments")
    .select(
      "*, locations(name), class_groups(label), sessions(name)"
    )
    .eq("id", enrollmentId)
    .eq("location_id", locationId)
    .single();

  if (!enrollment) notFound();

  const withRelations = enrollment as unknown as typeof enrollment & {
    locations?: { name?: string };
    class_groups?: { label?: string };
    sessions?: { name?: string };
  };

  return (
    <div>
      <Link
        href={`/admin/roster/${locationId}`}
        className="text-sm font-semibold text-brown-soft hover:text-orange"
      >
        ← {withRelations.locations?.name ?? "Back"}
      </Link>

      <h1 className="mt-2 font-heading font-extrabold text-2xl text-brown">
        {enrollment.child_name}
      </h1>
      <p className="mt-1 text-sm text-brown-soft">
        {formatAge(enrollment.child_dob)} old
        {enrollment.status === "past_due" && (
          <span className="ml-2 text-xs font-bold text-white bg-orange-dark rounded-full px-3 py-1">
            Past Due
          </span>
        )}
      </p>

      <div className="mt-6 bg-white rounded-2xl p-6 border-2 border-brown/10 shadow-sm space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Date of Birth" value={enrollment.child_dob} />
          <Field
            label="Class"
            value={
              withRelations.class_groups?.label ??
              withRelations.sessions?.name ??
              (enrollment.is_full_year ? "Full Year" : null)
            }
          />
        </div>

        <Field
          label="Address"
          value={
            [enrollment.child_address, enrollment.child_city, enrollment.child_state, enrollment.child_zip]
              .filter(Boolean)
              .join(", ") || null
          }
        />

        <Field label="Notes" value={enrollment.notes} />

        <div className="pt-4 border-t border-brown/10">
          <p className="font-heading font-bold text-brown mb-2">Parent #1</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" value={enrollment.parent_name} />
            <Field
              label="Email"
              value={
                <a href={`mailto:${enrollment.parent_email}`} className="text-orange underline">
                  {enrollment.parent_email}
                </a>
              }
            />
            <Field
              label="Phone"
              value={
                enrollment.parent_phone && (
                  <a href={`tel:${enrollment.parent_phone}`} className="text-orange underline">
                    {enrollment.parent_phone}
                  </a>
                )
              }
            />
          </div>
        </div>

        {(enrollment.parent2_name || enrollment.parent2_phone) && (
          <div className="pt-4 border-t border-brown/10">
            <p className="font-heading font-bold text-brown mb-2">Parent #2</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={enrollment.parent2_name} />
              <Field
                label="Phone"
                value={
                  enrollment.parent2_phone && (
                    <a href={`tel:${enrollment.parent2_phone}`} className="text-orange underline">
                      {enrollment.parent2_phone}
                    </a>
                  )
                }
              />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-brown/10">
          <p className="font-heading font-bold text-brown mb-2">Emergency Contact #1</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" value={enrollment.emergency1_name} />
            <Field
              label="Phone"
              value={
                enrollment.emergency1_phone && (
                  <a href={`tel:${enrollment.emergency1_phone}`} className="text-orange underline">
                    {enrollment.emergency1_phone}
                  </a>
                )
              }
            />
          </div>
        </div>

        {(enrollment.emergency2_name || enrollment.emergency2_phone) && (
          <div className="pt-4 border-t border-brown/10">
            <p className="font-heading font-bold text-brown mb-2">Emergency Contact #2</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" value={enrollment.emergency2_name} />
              <Field
                label="Phone"
                value={
                  enrollment.emergency2_phone && (
                    <a href={`tel:${enrollment.emergency2_phone}`} className="text-orange underline">
                      {enrollment.emergency2_phone}
                    </a>
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
