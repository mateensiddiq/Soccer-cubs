import Image from "next/image";
import {
  ArrowRight,
  Baby,
  CheckCircle,
  HandHeart,
  HouseLine,
  Medal,
  SealCheck,
  ShieldCheck,
  Certificate,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { GrassField } from "@/components/illustrations";

const CREDENTIALS = [
  { label: "USSF D-License Certified Coach", icon: Medal },
  { label: "SafeSport Certified", icon: ShieldCheck },
  { label: "Grassroots Coaching Licensed", icon: Certificate },
  { label: "7+ Years Coaching Childcare-Age Kids", icon: SealCheck },
];

const WHO_ITS_FOR = [
  {
    title: "Right at daycare",
    body: "No car seats, no rushing after work — we come to your child's daycare during the day.",
    icon: HouseLine,
  },
  {
    title: "Ages 2 & Up",
    body: "Classes are built for tiny legs and big giggles, with room to grow as your cub gets older.",
    icon: Baby,
  },
  {
    title: "Same Coach, Every Class",
    body: "Coach Mateen leads every session himself and talks with parents directly — building real safety and familiarity for cubs and families alike, not a new face every few months.",
    icon: HandHeart,
  },
];

const STEPS = [
  {
    step: "1",
    title: "Pick your daycare",
    body: "Choose the Soccer Cubs location where your child already spends their day.",
  },
  {
    step: "2",
    title: "Tell us about your cub",
    body: "A few quick details about your child so their coach is ready for them.",
  },
  {
    step: "3",
    title: "Enroll & pay online",
    body: "See your location's monthly rate and pay securely — that's it, you're on the team.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-yellow-soft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_32rem_at_78%_30%,rgb(255_255_255/0.65),transparent)]"
        />
        <Container className="relative grid lg:grid-cols-[1.02fr_1fr] gap-12 lg:gap-16 items-center pt-12 sm:pt-16 lg:pt-20 pb-32 sm:pb-40">
          <div className="text-center lg:text-left">
            <h1 className="rise font-heading font-extrabold text-brown text-5xl sm:text-6xl xl:text-7xl leading-[1.02]">
              Big kicks.
              <br />
              <span className="text-action">Bigger smiles.</span>
            </h1>
            <p
              className="rise mt-6 text-lg sm:text-xl text-brown-soft max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ "--d": "0.1s" } as React.CSSProperties}
            >
              Soccer Cubs brings playful, coach-led soccer classes straight to
              daycares across Northern Virginia &mdash; for wobbly, giggly,
              soccer-loving cubs ages 2 and up.
            </p>
            <div
              className="rise mt-9 flex flex-wrap items-center gap-3 justify-center lg:justify-start"
              style={{ "--d": "0.2s" } as React.CSSProperties}
            >
              <ButtonLink href="/signup" variant="primary" className="!px-8 !py-3.5 text-lg">
                Sign Up
              </ButtonLink>
              <ButtonLink href="/program" variant="outline" className="!py-3.5">
                See a typical class
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </ButtonLink>
            </div>
            <p
              className="rise mt-5 flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-brown-soft"
              style={{ "--d": "0.3s" } as React.CSSProperties}
            >
              <CheckCircle size={18} weight="fill" className="text-green-deep" aria-hidden="true" />
              Registration is open year-round
            </p>
          </div>

          <div
            className="rise relative mx-auto w-full max-w-xl lg:max-w-none pb-10 sm:pb-6"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          >
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-lift">
              <Image
                src="/images/photos/class-action-2.jpg"
                alt="Cubs dribbling soccer balls across the floor during a Soccer Cubs class"
                width={1619}
                height={971}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="aspect-[5/4] w-full object-cover object-[45%_50%]"
                preload
              />
            </div>
            <Image
              src="/images/brand/logo-full.png"
              alt="Soccer Cubs logo — a happy lion cub dribbling a soccer ball"
              width={480}
              height={480}
              className="absolute -bottom-4 -left-2 sm:-left-12 w-36 sm:w-52 h-auto -rotate-6 drop-shadow-[0_14px_18px_rgb(51_32_15/0.28)]"
            />
          </div>
        </Container>
        <GrassField className="absolute bottom-0 left-0 w-full h-20 sm:h-28" />
      </section>

      {/* Credentials */}
      <section className="bg-white border-b border-brown/10">
        <Container>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-brown/10">
            {CREDENTIALS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 px-2 lg:px-6 py-5 first:lg:pl-0 last:lg:pr-0"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-soft text-green-deep">
                  <Icon size={24} weight="duotone" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-brown leading-snug">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Who it's for */}
      <section className="py-20 sm:py-28">
        <Container className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal relative mx-auto w-full max-w-md lg:max-w-[26rem] lg:mx-0">
            <div className="overflow-hidden rounded-[2rem] shadow-lift border-4 border-white">
              <Image
                src="/images/photos/class-action-3.jpg"
                alt="Cubs in matching orange shirts kicking soccer balls across a daycare hall during class"
                width={1400}
                height={1750}
                sizes="(min-width: 1024px) 416px, 92vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="reveal">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-brown leading-[1.05]">
              Made for the littlest players
            </h2>
            <p className="mt-4 text-lg text-brown-soft max-w-lg">
              We keep it simple, silly, and full of movement &mdash; because
              that&apos;s exactly what this age needs.
            </p>
            <ul className="mt-8 divide-y divide-brown/10 border-y border-brown/10">
              {WHO_ITS_FOR.map(({ title, body, icon: Icon }) => (
                <li key={title} className="flex gap-4 py-5">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-soft text-action">
                    <Icon size={26} weight="duotone" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-brown">{title}</h3>
                    <p className="mt-1 text-brown-soft leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="reveal rounded-[2rem] bg-white border border-brown/10 shadow-soft px-6 py-12 sm:px-12 sm:py-16">
            <h2 className="text-center font-heading font-extrabold text-3xl sm:text-4xl text-brown">
              Signing up takes about 2 minutes
            </h2>
            <ol className="relative mt-12 grid md:grid-cols-3 gap-10 md:gap-8">
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-7 left-[16.6%] right-[16.6%] border-t-2 border-dashed border-orange/40"
              />
              {STEPS.map(({ step, title, body }) => (
                <li key={step} className="relative text-center px-2">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-action text-white font-heading font-extrabold text-2xl ring-8 ring-white">
                    {step}
                  </div>
                  <h3 className="mt-5 font-heading font-bold text-xl text-brown">{title}</h3>
                  <p className="mt-2 text-brown-soft max-w-xs mx-auto leading-relaxed">{body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-12 flex items-center justify-center gap-2 text-center text-sm font-semibold text-brown-soft">
              <CheckCircle size={18} weight="fill" className="text-green-deep shrink-0" aria-hidden="true" />
              No long-term commitment — you can edit your info or cancel anytime.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
