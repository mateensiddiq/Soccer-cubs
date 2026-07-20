import type { ReactNode } from "react";
import Container from "./Container";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-yellow-soft py-12 sm:py-16">
      <Container className="text-center">
        {eyebrow && (
          <span className="inline-block bg-white text-orange font-heading font-bold text-xs px-3 py-1 rounded-full border-2 border-orange/20">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-heading font-extrabold text-4xl text-brown">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-brown-soft max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
