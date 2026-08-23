import Image from "next/image";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Cloud, GrassField, PawPrint, ShieldCheck, SoccerBall, SunBurst } from "@/components/illustrations";

const CREDENTIALS = [
  "USSF D-License Certified Coach",
  "SafeSport Certified",
];

const WHO_ITS_FOR = [
  {
    title: "Right at daycare",
    body: "No car seats, no rushing after work — we come to your child's daycare during the day.",
    icon: SoccerBall,
  },
  {
    title: "Ages 2 & Up",
    body: "Classes are built for tiny legs and big giggles, with room to grow as your cub gets older.",
    icon: SunBurst,
  },
  {
    title: "Same Coach, Every Class",
    body: "Coach Mateen leads every session himself and talks with parents directly — building real safety and familiarity for cubs and families alike, not a new face every few months.",
    icon: PawPrint,
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
      <section
        className="relative overflow-hidden bg-yellow-soft"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(51,32,15,0.07) 1.5px, transparent 1.6px)",
          backgroundSize: "24px 24px",
        }}
      >
        <Cloud className="absolute top-6 left-2 w-24 sm:w-32 opacity-80 pointer-events-none" />
        <Cloud className="absolute top-20 right-4 w-20 sm:w-28 opacity-70 pointer-events-none hidden sm:block" />
        <SunBurst className="absolute -top-6 -right-6 h-24 w-24 sm:h-32 sm:w-32 opacity-90 pointer-events-none" />

        <Container className="relative grid lg:grid-cols-2 gap-10 items-center pt-14 sm:pt-20 pb-24 sm:pb-28">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brown leading-tight">
              Big kicks. <br className="hidden sm:block" />
              Bigger smiles.
            </h1>
            <p className="mt-4 text-lg text-brown-soft max-w-md mx-auto lg:mx-0">
              Soccer Cubs brings playful, coach-led soccer classes straight to
              daycares across Northern Virginia &mdash; for wobbly, giggly,
              soccer-loving cubs ages 2 and up.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
              <ButtonLink href="/signup" variant="primary">
                Sign Up
              </ButtonLink>
              <ButtonLink href="/for-daycares" variant="outline">
                I&apos;m a Daycare Director
              </ButtonLink>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-yellow blur-3xl opacity-50" />
            </div>
            <Image
              src="/images/brand/logo-full.png"
              alt="Soccer Cubs logo — a happy lion cub dribbling a soccer ball"
              width={480}
              height={480}
              className="relative w-64 sm:w-80 lg:w-96 h-auto drop-shadow-lg"
              preload
            />
          </div>
        </Container>
        <GrassField className="absolute bottom-0 left-0 w-full h-20 sm:h-28" />
      </section>

      {/* Trust badges */}
      <section className="py-5 bg-white border-b border-brown/10">
        <Container className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {CREDENTIALS.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-green-soft rounded-full pl-2.5 pr-4 py-1.5"
            >
              <ShieldCheck className="h-6 w-6 text-green shrink-0" />
              <span className="text-sm font-semibold text-brown">{label}</span>
            </div>
          ))}
        </Container>
      </section>

      {/* Who it's for */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-brown">
              Made for the littlest players
            </h2>
            <p className="mt-3 text-brown-soft">
              We keep it simple, silly, and full of movement &mdash; because
              that&apos;s exactly what this age needs.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {WHO_ITS_FOR.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm"
              >
                <Icon className="h-12 w-12" />
                <h3 className="mt-4 font-heading font-bold text-lg text-brown">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-brown-soft">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 border-t border-brown/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-brown">
              Signing up takes about 2 minutes
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {STEPS.map(({ step, title, body }) => (
              <div key={step} className="text-center px-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-orange text-white font-heading font-extrabold text-xl flex items-center justify-center shadow-sm">
                  {step}
                </div>
                <h3 className="mt-4 font-heading font-bold text-lg text-brown">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-brown-soft">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/signup" variant="primary">
              Start Sign Up ⚽
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
