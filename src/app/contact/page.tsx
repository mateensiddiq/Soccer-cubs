import type { Metadata } from "next";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Soccer Cubs",
  description: "Get in touch with Soccer Cubs: questions, partnerships, and more.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Say hi!"
        subtitle="Questions about classes, a daycare partnership, or anything else? Send a message and we'll get back to you soon."
      />
      <section className="py-14 sm:py-20">
        <Container className="max-w-xl grid gap-8">
          <a
            href="mailto:joinsoccercubs@gmail.com"
            className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-brown/10 bg-white px-5 py-2.5 text-sm text-brown-soft shadow-soft transition-colors hover:border-action"
          >
            <EnvelopeSimple size={20} weight="duotone" className="text-action" aria-hidden="true" />
            <span>
              Or email us directly:{" "}
              <span className="font-bold text-action">joinsoccercubs@gmail.com</span>
            </span>
          </a>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
}
