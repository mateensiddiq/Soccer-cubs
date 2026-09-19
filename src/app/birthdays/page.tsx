import type { Metadata } from "next";
import { Confetti, Package, SoccerBall } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import BirthdayForm from "@/components/BirthdayForm";

export const metadata: Metadata = {
  title: "Birthdays & Events | Soccer Cubs",
  description:
    "Book Soccer Cubs for a birthday party or special event, with soccer games and activities for little ones.",
};

const HIGHLIGHTS = [
  {
    title: "Games for every age",
    body: "Age-appropriate soccer games and activities so every kid at the party gets to join in.",
    icon: SoccerBall,
  },
  {
    title: "We bring the gear",
    body: "Soft training balls, cones, and everything needed. You just pick the spot.",
    icon: Package,
  },
  {
    title: "Flexible & fun",
    body: "Tell us about your event and we'll tailor the games to the group and space.",
    icon: Confetti,
  },
];

export default function BirthdaysPage() {
  return (
    <div>
      <PageHero
        title="Let's celebrate with soccer!"
        subtitle="Soccer Cubs isn't just for daycares. We love bringing playful soccer games to birthday parties and special events too."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <ul className="reveal grid sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-brown/10 mb-16">
            {HIGHLIGHTS.map(({ title, body, icon: Icon }) => (
              <li key={title} className="sm:px-8 first:sm:pl-0 last:sm:pr-0 text-center sm:text-left">
                <span className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-soft text-action">
                  <Icon size={28} weight="duotone" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading font-bold text-xl text-brown">{title}</h3>
                <p className="mt-2 text-brown-soft leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>

          <div className="max-w-xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-brown text-center mb-3">
              Tell us about your event
            </h2>
            <p className="text-brown-soft text-center mb-8">
              This is just an inquiry, with no payment required here. We&apos;ll
              follow up to talk through details and pricing.
            </p>
            <BirthdayForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
