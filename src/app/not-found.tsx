import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { SoccerBall } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Page Not Found | Soccer Cubs",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center bg-gradient-to-b from-yellow-soft to-cream">
      <Container className="text-center py-20">
        <SoccerBall className="h-20 w-20 mx-auto" />
        <p className="mt-6 font-heading font-extrabold text-2xl text-orange">
          404
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-3xl sm:text-4xl text-brown">
          Looks like this ball rolled out of bounds
        </h1>
        <p className="mt-4 text-brown-soft max-w-md mx-auto">
          We couldn&apos;t find the page you were looking for. Let&apos;s get
          you back on the field.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
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
