import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import BirthdayForm from "@/components/BirthdayForm";
import { SoccerBall, SunBurst, PawPrint } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Birthdays & Events | Soccer Cubs",
  description:
    "Book Soccer Cubs for a birthday party or special event — soccer games and activities for little ones.",
};

const HIGHLIGHTS = [
  {
    title: "Games for every age",
    body: "Age-appropriate soccer games and activities so every kid at the party gets to join in.",
    icon: SoccerBall,
  },
  {
    title: "We bring the gear",
    body: "Soft training balls, cones, and everything needed — you just pick the spot.",
    icon: SunBurst,
  },
  {
    title: "Flexible & fun",
    body: "Tell us about your event and we'll tailor the games to the group and space.",
    icon: PawPrint,
  },
];

export default function BirthdaysPage() {
  return (
    <div>
      <PageHero
        eyebrow="BIRTHDAYS & EVENTS"
        title="Let's celebrate with soccer!"
        subtitle="Soccer Cubs isn't just for daycares — we love bringing playful soccer games to birthday parties and special events too."
      />

      <section className="py-14">
        <Container>
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {HIGHLIGHTS.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm text-center"
              >
                <Icon className="h-10 w-10 mx-auto" />
                <h3 className="mt-3 font-heading font-bold text-brown">{title}</h3>
                <p className="mt-1 text-sm text-brown-soft">{body}</p>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl text-brown text-center mb-2">
              Tell us about your event
            </h2>
            <p className="text-brown-soft text-center text-sm mb-6">
              This is just an inquiry — no payment required here. We&apos;ll
              follow up to talk through details and pricing.
            </p>
            <BirthdayForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
