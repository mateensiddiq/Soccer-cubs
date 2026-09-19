import type { Metadata } from "next";
import { SoccerBall } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found | Soccer Cubs",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center bg-yellow-soft">
      <Container className="text-center py-24">
        <SoccerBall size={72} weight="duotone" className="mx-auto text-brown" aria-hidden="true" />
        <p className="mt-6 font-heading font-extrabold text-2xl text-action">
          404
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-5xl text-brown">
          Looks like this ball rolled out of bounds
        </h1>
        <p className="mt-5 text-lg text-brown-soft max-w-md mx-auto">
          We couldn&apos;t find the page you were looking for. Let&apos;s get
          you back on the field.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 justify-center">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/signup" variant="outline">
            Sign Up
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
