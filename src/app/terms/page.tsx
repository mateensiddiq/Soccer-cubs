import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PlaceholderNote from "@/components/PlaceholderNote";

export const metadata: Metadata = {
  title: "Terms | Soccer Cubs",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero title="Terms of Service" />
      <section className="py-14">
        <Container className="max-w-3xl">
          <PlaceholderNote>
            this is starter boilerplate, not legal advice. Have a lawyer
            review it, especially the cancellation, liability, and refund
            sections, before you rely on it.
          </PlaceholderNote>

          <div className="space-y-6 text-brown-soft">
            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Enrollment & billing
              </h2>
              <p>
                Enrolling in Soccer Cubs starts a monthly subscription billed
                automatically to the payment method you provide, at the rate
                shown for your daycare location during sign-up. Subscriptions
                renew each month until cancelled.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Cancellations
              </h2>
              <p>
                You can cancel your subscription at any time from the{" "}
                <a href="/billing" className="text-orange font-semibold">
                  Manage My Subscription
                </a>{" "}
                page. Cancellations take effect at the end of your current
                billing period; we don&apos;t provide partial-month refunds.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Assumption of risk
              </h2>
              <p>
                Soccer Cubs classes involve physical activity. By enrolling,
                you acknowledge the general risks of participation in
                youth sports activities.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brown mb-2">
                Contact
              </h2>
              <p>
                Questions about these terms? Reach out through our{" "}
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
