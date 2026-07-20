import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PlaceholderNote from "@/components/PlaceholderNote";

export const metadata: Metadata = {
  title: "Privacy Policy | Soccer Cubs",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero title="Privacy Policy" />
      <section className="py-14">
        <Container className="max-w-3xl prose-headings:font-heading">
          <PlaceholderNote>
            this is starter boilerplate, not legal advice. Have a lawyer
            review it before you rely on it, especially the parts about
            children&apos;s information.
          </PlaceholderNote>

          <div className="space-y-6 text-brown-soft">
            <p>
              Last updated: this policy explains what information Soccer
              Cubs collects when you visit this website or sign up for
              classes, and how that information is used.
            </p>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Information we collect
              </h2>
              <p>
                When you sign up for classes, we collect your name, email,
                phone number, and your child&apos;s name and date of birth,
                along with any notes you choose to share (such as
                allergies). Payment is processed securely by Stripe &mdash;
                we do not store your card details ourselves. When you
                contact us or submit a birthday/event inquiry, we collect
                whatever information you include in that form.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                How we use it
              </h2>
              <p>
                We use this information to run classes, communicate with
                parents and daycare partners, process payments, and respond
                to inquiries. We do not sell your information to third
                parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Payment processing
              </h2>
              <p>
                Subscription payments are handled by Stripe, a
                PCI-compliant payment processor. Stripe&apos;s own privacy
                policy governs how they handle your payment details.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Contact us
              </h2>
              <p>
                Questions about this policy? Reach out through our{" "}
                <a href="/contact" className="text-orange font-semibold">
                  contact page
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
