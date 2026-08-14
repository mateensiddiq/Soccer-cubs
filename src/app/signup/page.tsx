import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { PawPrint } from "@/components/illustrations";
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
        eyebrow="SIGN UP"
        title="Let's get your cub on the team"
        subtitle="Registration is open year-round — pick your daycare below to see class times and get started."
      />

      <section className="py-14">
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
                  className="bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm flex flex-col"
                >
                  <PawPrint className="h-8 w-8 text-orange" />
                  <h3 className="mt-3 font-heading font-bold text-lg text-brown">
                    {location.name}
                  </h3>
                  {location.address && (
                    <p className="mt-1 text-sm text-brown-soft">{location.address}</p>
                  )}
                  {location.class_day ? (
                    <p className="mt-1 text-sm font-semibold text-orange">
                      Classes: {location.class_day}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-brown-soft">
                      Schedule: Coming soon
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-brown/10">
                    <ButtonLink
                      href={`/signup/${location.id}`}
                      variant="outline"
                      className="!text-sm !py-2 !px-4 w-full"
                    >
                      Sign Up Here
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-14 bg-green-soft rounded-[2.5rem] p-8 sm:p-10 text-center border-2 border-brown/10">
            <p className="font-heading font-bold text-xl text-brown">
              Want Soccer Cubs at your daycare?
            </p>
            <p className="mt-2 text-brown-soft text-sm max-w-md mx-auto">
              We&apos;d love to chat about bringing the program on-site.
            </p>
            <div className="mt-5">
              <ButtonLink href="/contact" variant="primary">
                Get In Touch
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
