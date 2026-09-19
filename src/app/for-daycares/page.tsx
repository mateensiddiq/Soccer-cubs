import type { Metadata } from "next";
import Image from "next/image";
import { HandHeart, Quotes, SoccerBall } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "For Daycare Directors | Soccer Cubs",
  description:
    "Bring Soccer Cubs to your daycare. A fun, on-site soccer program that teaches real skills, with zero hassle and zero cost to your school.",
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
    body: "Coach Mateen leads every session himself and handles all scheduling and communication personally, with no rotating coaches or new faces.",
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
        title="Bring Soccer Cubs to your students"
        subtitle="A fun, on-site soccer program that teaches real skills, with zero hassle for your school."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-brown leading-[1.05]">
              We handle the coaching and the equipment
            </h2>
            <p className="mt-5 text-lg text-brown-soft leading-relaxed max-w-lg">
              Parents sign up and pay directly online, at no cost to you,
              just a joyful, active program your families will
              love, with zero extra work for your staff.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="primary">
                Ask About Partnering
              </ButtonLink>
            </div>
          </div>
          <div className="reveal flex justify-center">
            <div className="flex h-72 w-72 sm:h-96 sm:w-96 items-center justify-center rounded-full bg-yellow-soft ring-1 ring-brown/10">
              <Image
                src="/images/brand/cub.png"
                alt="Soccer Cubs mascot with a soccer ball"
                width={320}
                height={320}
                className="w-52 sm:w-72 h-auto drop-shadow-[0_16px_18px_rgb(51_32_15/0.22)]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="reveal grid md:grid-cols-2 gap-12 md:gap-0 md:divide-x divide-brown/10 rounded-[2rem] bg-white border border-brown/10 shadow-soft px-6 py-12 sm:px-12 sm:py-14">
            <div className="md:pr-12">
              <h2 className="font-heading font-extrabold text-2xl text-brown mb-6">
                What kids get
              </h2>
              <ul className="space-y-6">
                {KID_BENEFITS.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-soft text-action">
                      <SoccerBall size={24} weight="duotone" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-heading font-bold text-lg text-brown">{item.title}</p>
                      <p className="mt-0.5 text-brown-soft leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-12">
              <h2 className="font-heading font-extrabold text-2xl text-brown mb-6">
                Why it works for you
              </h2>
              <ul className="space-y-6">
                {DAYCARE_BENEFITS.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-soft text-green-deep">
                      <HandHeart size={24} weight="duotone" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-heading font-bold text-lg text-brown">{item.title}</p>
                      <p className="mt-0.5 text-brown-soft leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="max-w-3xl">
          <figure className="reveal text-center">
            <Quotes size={44} weight="fill" className="mx-auto text-orange" aria-hidden="true" />
            <blockquote className="mt-4 font-heading text-2xl sm:text-3xl font-bold text-brown leading-snug">
              &ldquo;Our families love that it&apos;s the same coach every
              week. Mateen knows every kid by name, and parents actually
              recognize him at pickup. That consistency is rare.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm font-bold text-brown-soft">
              Director, Sugarland Learning Academy
            </figcaption>
          </figure>
        </Container>
      </section>
    </div>
  );
}
