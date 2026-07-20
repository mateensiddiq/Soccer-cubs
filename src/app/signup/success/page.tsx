import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { SoccerBall } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "You're Signed Up! | Soccer Cubs",
};

export default function SignupSuccessPage() {
  return (
    <section className="py-20">
      <Container className="max-w-lg text-center">
        <SoccerBall className="h-20 w-20 mx-auto" />
        <h1 className="mt-4 font-heading font-extrabold text-3xl text-brown">
          You&apos;re on the team! ⚽
        </h1>
        <p className="mt-3 text-brown-soft">
          Thanks for signing up for Soccer Cubs! A confirmation email is on
          its way with everything you need to know before class.
        </p>
        <p className="mt-2 text-sm text-brown-soft">
          You can manage or cancel your subscription anytime from the{" "}
          <a href="/billing" className="text-orange font-semibold">
            Manage My Subscription
          </a>{" "}
          page.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
