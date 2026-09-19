import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "You're Signed Up! | Soccer Cubs",
};

export default function SignupSuccessPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-lg text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-soft text-green-deep">
          <CheckCircle size={48} weight="fill" aria-hidden="true" />
        </span>
        <h1 className="rise mt-6 font-heading font-extrabold text-4xl text-brown">
          You&apos;re on the team!
        </h1>
        <p className="mt-4 text-lg text-brown-soft leading-relaxed">
          Thanks for signing up for Soccer Cubs! A confirmation email is on
          its way with everything you need to know before class.
        </p>
        <p className="mt-3 text-sm text-brown-soft">
          You can manage or cancel your subscription anytime from the{" "}
          <a href="/billing" className="text-action font-bold underline underline-offset-4">
            Manage My Subscription
          </a>{" "}
          page.
        </p>
        <div className="mt-9">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
