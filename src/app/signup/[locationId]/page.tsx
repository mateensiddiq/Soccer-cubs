import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SchoolSignupForm from "@/components/SchoolSignupForm";
import {
  getPublicLocation,
  getPublicClassGroups,
  getPublicSessions,
} from "@/lib/locations";

export const revalidate = 60;

const PROGRAM_DESCRIPTION =
  "Soccer Cubs offers year-round soccer training for ages 2+, taught by Coach Mateen, covering the basics like dribbling, passing, and ball control through simple, age-appropriate drills and games. It's the perfect first step for little ones to build coordination and confidence while learning to play and share the field with friends. With Coach Mateen guiding every session, your child gets consistent, trusted coaching as they grow comfortable with the ball and the game.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationId: string }>;
}): Promise<Metadata> {
  const { locationId } = await params;
  const location = await getPublicLocation(locationId);
  return {
    title: location ? `Sign Up at ${location.name} | Soccer Cubs` : "Sign Up | Soccer Cubs",
    description: "Registration is open year-round. Sign your cub up for Soccer Cubs.",
  };
}

export default async function SchoolSignupPage({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  const { locationId } = await params;
  const location = await getPublicLocation(locationId);
  if (!location) notFound();

  const [classGroups, sessions] = await Promise.all([
    getPublicClassGroups(locationId),
    location.pricing_mode === "sessions" ? getPublicSessions(locationId) : Promise.resolve([]),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="REGISTRATION OPEN YEAR-ROUND"
        title={location.name}
        subtitle={PROGRAM_DESCRIPTION}
      />

      <section className="py-14">
        <Container className="max-w-xl">
          <div className="mb-8 bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm">
            <h2 className="font-heading font-bold text-lg text-brown">
              {classGroups.length > 1 ? "Class Times" : "Class Time"}
            </h2>
            {classGroups.length > 0 ? (
              <div className="mt-3 space-y-2">
                {classGroups.map((g) => (
                  <p key={g.id} className="text-sm text-brown-soft">
                    <span className="font-semibold text-brown">{g.label}</span>
                    {[g.age_range, g.time_range].filter(Boolean).length > 0 && (
                      <> — {[g.age_range, g.time_range].filter(Boolean).join(" · ")}</>
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-brown-soft">
                Schedule coming soon — sign up now and we&apos;ll follow up
                with your exact class time before your first class.
              </p>
            )}
          </div>

          <SchoolSignupForm
            location={location}
            classGroups={classGroups}
            sessions={sessions}
          />
        </Container>
      </section>
    </div>
  );
}
