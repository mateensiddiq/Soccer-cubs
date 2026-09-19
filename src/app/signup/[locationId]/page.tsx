import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarBlank, CheckCircle, Clock } from "@phosphor-icons/react/dist/ssr";
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

  const hasGroups = classGroups.length > 0;

  return (
    <div>
      <PageHero
        title={location.name}
        subtitle={location.address ?? undefined}
        note={
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-green-deep ring-1 ring-brown/10">
            <CheckCircle size={18} weight="fill" aria-hidden="true" />
            Registration open year-round
          </span>
        }
      />

      <section className="py-12 sm:py-20">
        <Container className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28 space-y-8">
            <div>
              <h2 className="font-heading font-bold text-xl text-brown">
                {classGroups.length > 1 ? "Class times" : "Class time"}
              </h2>
              <ul className="mt-4 space-y-3">
                {location.class_day && (
                  <li className="flex items-center gap-3 font-bold text-brown">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-soft text-action">
                      <CalendarBlank size={22} weight="duotone" aria-hidden="true" />
                    </span>
                    {location.class_day}
                  </li>
                )}
                {hasGroups ? (
                  classGroups.map((g) => {
                    const detail = [g.age_range, g.time_range].filter(Boolean).join(" · ");
                    return (
                      <li key={g.id} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-soft text-action">
                          <Clock size={22} weight="duotone" aria-hidden="true" />
                        </span>
                        <span className="text-brown">
                          <span className="font-bold">{g.label}</span>
                          {detail && <span className="text-brown-soft">: {detail}</span>}
                        </span>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-brown-soft leading-relaxed">
                    Schedule coming soon. Sign up now and we&apos;ll follow up
                    with your exact class time before your first class.
                  </li>
                )}
              </ul>
            </div>

            <p className="text-brown-soft leading-relaxed border-t border-brown/10 pt-8">
              {PROGRAM_DESCRIPTION}
            </p>
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
