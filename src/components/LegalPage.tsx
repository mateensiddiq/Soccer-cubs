import type { ReactNode } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import PageHero from "./PageHero";

export type LegalSectionData = { id: string; title: string; body: ReactNode };

// Shared layout for the Privacy Policy and Terms of Service: a plain-language
// intro, an optional "short version" summary, a contents list, and numbered
// sections that can be linked to directly.
export default function LegalPage({
  title,
  subtitle,
  updated,
  intro,
  summary,
  sections,
}: {
  title: string;
  subtitle: string;
  updated: string;
  intro: ReactNode;
  summary?: string[];
  sections: LegalSectionData[];
}) {
  return (
    <div>
      <PageHero title={title} subtitle={subtitle} />
      <section className="py-12 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm font-bold text-brown-soft">Last updated: {updated}</p>
          <div className="mt-4 space-y-4 text-lg text-brown-soft leading-relaxed">{intro}</div>

          {summary && (
            <div className="mt-8 rounded-3xl bg-green-soft ring-1 ring-green/30 p-6 sm:p-8">
              <h2 className="font-heading font-extrabold text-xl text-brown">The short version</h2>
              <ul className="mt-4 space-y-3">
                {summary.map((item) => (
                  <li key={item} className="flex gap-3 text-brown leading-relaxed">
                    <CheckCircle
                      size={22}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-green-deep"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <nav
            aria-label="On this page"
            className="mt-8 rounded-3xl border border-brown/10 bg-white p-6 sm:p-8 shadow-soft"
          >
            <p className="font-heading font-extrabold text-lg text-brown">Contents</p>
            <ol className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="font-bold text-action underline-offset-4 hover:underline"
                  >
                    {i + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-6">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="pt-10">
                <h2 className="font-heading font-extrabold text-2xl text-brown">
                  {i + 1}. {section.title}
                </h2>
                <div className="mt-3 space-y-4 leading-relaxed text-brown-soft [&_a]:font-bold [&_a]:text-action [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-brown [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-orange">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
