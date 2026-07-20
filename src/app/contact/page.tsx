import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PlaceholderNote from "@/components/PlaceholderNote";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Soccer Cubs",
  description: "Get in touch with Soccer Cubs — questions, partnerships, and more.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="CONTACT"
        title="Say hi!"
        subtitle="Questions about classes, a daycare partnership, or anything else? Send a message and we'll get back to you soon."
      />
      <section className="py-14">
        <Container className="max-w-xl grid gap-8">
          <PlaceholderNote>
            replace this email address with your real one.
          </PlaceholderNote>
          <div className="text-center text-brown-soft text-sm -mt-4">
            You can also reach us directly at{" "}
            <a href="mailto:hello@soccercubs.com" className="text-orange font-semibold">
              hello@soccercubs.com
            </a>
          </div>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
}
