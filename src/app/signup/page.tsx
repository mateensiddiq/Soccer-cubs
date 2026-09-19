import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { ArrowRight, CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import { getPublicLocations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Sign Up | Soccer Cubs",
  description: "Sign your cub up for Soccer Cubs classes at their daycare. Registration is open year-round.",
};

// Refetch from Supabase at most once a minute instead of baking the list in
// at build time — otherwise a location added in Table Editor wouldn't show
// up here until the next deploy.
export const revalidate = 60;

export default async function SignupPage() {
  const locations = await getPublicLocations();

  return (
    <div>
      <PageHero
        title="Let's get your cub on the team"
        subtitle="Registration is open year-round. Pick your daycare below to see class times and get started."
      />

      <section className="py-14 sm:py-20">
        <Container>
          {locations.length === 0 ? (
            <div className="max-w-lg mx-auto text-center bg-white rounded-3xl p-10 border-2 border-dashed border-brown/15">
              <p className="font-heading font-bold text-lg text-brown">
                No locations available yet
              </p>
              <p className="mt-2 text-sm text-brown-soft">
                Once daycare locations are added, families will be able to
                sign up here.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="reveal group flex flex-col rounded-3xl bg-white border border-brown/10 p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
                >
                  <h3 className="font-heading font-extrabold text-2xl text-brown leading-tight">
                    {location.name}
                  </h3>
                  {location.address && (
                    <p className="mt-3 flex items-start gap-2 text-brown-soft">
                      <MapPin size={20} weight="duotone" className="mt-0.5 shrink-0 text-action" aria-hidden="true" />
                      {location.address}
                    </p>
                  )}
                  <p
                    className={`mt-2 flex items-center gap-2 font-bold ${
                      location.class_day ? "text-brown" : "text-brown-soft"
                    }`}
                  >
                    <CalendarBlank size={20} weight="duotone" className="shrink-0 text-action" aria-hidden="true" />
                    {location.class_day ? `Classes: ${location.class_day}` : "Schedule: Coming soon"}
                  </p>
                  <div className="mt-auto pt-7">
                    <ButtonLink
                      href={`/signup/${location.id}`}
                      variant="outline"
                      className="w-full group-hover:border-action group-hover:text-action"
                    >
                      Sign Up Here
                      <ArrowRight size={18} weight="bold" aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="reveal mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[2rem] bg-green-soft px-8 py-9 sm:px-12 ring-1 ring-green/30">
            <div className="text-center sm:text-left">
              <p className="font-heading font-extrabold text-2xl text-brown">
                Want Soccer Cubs at your daycare?
              </p>
              <p className="mt-1.5 text-brown-soft">
                We&apos;d love to chat about bringing the program on-site.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" className="shrink-0">
              Get In Touch
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
