import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import BillingRequestForm from "@/components/BillingRequestForm";

export const metadata: Metadata = {
  title: "Manage My Subscription | Soccer Cubs",
};

const ERROR_MESSAGES: Record<string, string> = {
  missing_token: "That link is missing some information. Please request a new one below.",
  expired: "That link has expired. Please request a new one below.",
};

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <PageHero
        eyebrow="MANAGE SUBSCRIPTION"
        title="Manage my subscription"
        subtitle="Enter the email you used to sign up and we'll email you a secure link to update your payment method or cancel — no password needed."
      />
      <section className="py-14">
        <Container className="max-w-md">
          {error && (
            <div className="mb-6 rounded-2xl bg-pink/40 border-2 border-orange/20 px-4 py-3 text-sm font-semibold text-brown text-center">
              {ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."}
            </div>
          )}
          <BillingRequestForm />
        </Container>
      </section>
    </div>
  );
}
