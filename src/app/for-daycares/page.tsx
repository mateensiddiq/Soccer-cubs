import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { PawPrint, SoccerBall } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "For Daycare Directors | Soccer Cubs",
  description:
    "Bring Soccer Cubs to your daycare — a fun, on-site soccer program that teaches real skills, with zero hassle and zero cost to your school.",
};

const KID_BENEFITS = [
  {
    title: "Motor skills & coordination",
    body: "Age-appropriate drills build balance, agility, and ball control.",
  },
  {
    title: "Teamwork & social skills",
    body: "Kids learn to share, cooperate, and cheer each other on.",
  },
  {
    title: "Confidence building",
    body: "Every child gets encouragement and small wins each week.",
  },
];

const DAYCARE_BENEFITS = [
  {
    title: "Local & reliable",
    body: "Based right here in Northern Virginia, showing up every single week, rain or shine.",
  },
  {
    title: "One familiar face all year",
    body: "Coach Mateen leads every session himself and handles all scheduling and communication personally — no rotating coaches or new faces.",
  },
  {
    title: "We bring the gear",
    body: "All equipment provided. Nothing for your staff to manage or store.",
  },
];

export default function ForDaycaresPage() {
  return (
    <div>
      <PageHero
        eyebrow="FOR DAYCARE DIRECTORS"
        title="Bring Soccer Cubs to your students"
        subtitle="A fun, on-site soccer program that teaches real skills — with zero hassle for your school."
      />

      <section className="py-16">
        <Container>
          <div className="bg-green-soft rounded-[2.5rem] p-8 sm:p-14 border-2 border-brown/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-heading font-extrabold text-2xl text-brown">
                  We handle the coaching and the equipment
                </h2>
                <p className="mt-3 text-brown-soft">
                  Parents sign up and pay directly online, at no cost to you
                  &mdash; just a joyful, active program your families will
                  love, with zero extra work for your staff.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/contact" variant="primary">
                    Ask About Partnering
                  </ButtonLink>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/brand/cub.png"
                  alt="Soccer Cubs mascot with a soccer ball"
                  width={320}
                  height={320}
                  className="w-48 sm:w-64 h-auto"
                />
              </div>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-8">
              <div>
                <p className="font-heading font-bold text-brown mb-4">
                  What kids get
                </p>
                <ul className="space-y-4">
                  {KID_BENEFITS.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <SoccerBall className="h-8 w-8 shrink-0" />
                      <div>
                        <p className="font-semibold text-brown text-sm">{item.title}</p>
                        <p className="text-sm text-brown-soft">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-heading font-bold text-brown mb-4">
                  Why it works for you
                </p>
                <ul className="space-y-4">
                  {DAYCARE_BENEFITS.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <PawPrint className="h-8 w-8 shrink-0 text-orange" />
                      <div>
                        <p className="font-semibold text-brown text-sm">{item.title}</p>
                        <p className="text-sm text-brown-soft">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <blockquote className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border-l-4 border-orange">
              <p className="text-brown italic">
                &ldquo;Our families love that it&apos;s the same coach every
                week. Mateen knows every kid by name, and parents actually
                recognize him at pickup. That consistency is rare.&rdquo;
              </p>
              <footer className="mt-3 text-sm font-semibold text-orange">
                Director, Sugarland Learning Academy
              </footer>
            </blockquote>
          </div>
        </Container>
      </section>
    </div>
  );
}
