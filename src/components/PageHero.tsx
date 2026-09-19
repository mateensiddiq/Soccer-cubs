import type { ReactNode } from "react";
import Container from "./Container";

// The page title carries its own weight; there's deliberately no label chip
// above it. `note` is for a short factual status line shown under the
// subtitle (e.g. "Registration open year-round").
export default function PageHero({
  title,
  subtitle,
  note,
  children,
}: {
  title: string;
  subtitle?: string;
  note?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-yellow-soft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_24rem_at_50%_-10%,rgb(255_255_255/0.6),transparent)]"
      />
      <Container className="relative py-14 sm:py-20 text-center">
        <h1 className="rise font-heading font-extrabold text-4xl sm:text-5xl text-brown leading-[1.08]">
          {title}
        </h1>
        {subtitle && (
          <p
            className="rise mt-5 text-brown-soft max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            {subtitle}
          </p>
        )}
        {note && (
          <div
            className="rise mt-6 flex justify-center"
            style={{ "--d": "0.16s" } as React.CSSProperties}
          >
            {note}
          </div>
        )}
        {children}
      </Container>
      <div className="h-px bg-brown/10" />
    </section>
  );
}
