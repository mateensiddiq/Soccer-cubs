import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SignupWizard from "@/components/SignupWizard";
import { getPublicLocations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Sign Up | Soccer Cubs",
  description: "Sign your cub up for Soccer Cubs classes at their daycare.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const [{ location }, locations] = await Promise.all([
    searchParams,
    getPublicLocations(),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="SIGN UP"
        title="Let's get your cub on the team"
        subtitle="Pick your daycare, tell us a bit about your child, and see your monthly rate before you pay."
      />
      <section className="py-14">
        <Container className="max-w-xl">
          <SignupWizard locations={locations} initialLocationId={location} />
        </Container>
      </section>
    </div>
  );
}
