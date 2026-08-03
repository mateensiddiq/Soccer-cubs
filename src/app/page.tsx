import Image from "next/image";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { GrassBlob, PawPrint, SoccerBall, SunBurst } from "@/components/illustrations";

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
    title: "Coach-led & confidence-building",
    body: "Every class is led by a coach who knows how to keep little ones moving, laughing, and learning.",
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
      <section className="relative overflow-hidden bg-yellow-soft">
        <Container className="grid lg:grid-cols-2 gap-10 items-center py-14 sm:py-20">
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
                Sign Up My Cub ⚽
              </ButtonLink>
              <ButtonLink href="/for-daycares" variant="outline">
                I&apos;m a Daycare Director
              </ButtonLink>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <Image
              src="/images/brand/logo-full.png"
              alt="Soccer Cubs logo — a happy lion cub dribbling a soccer ball"
              width={480}
              height={480}
              className="w-64 sm:w-80 lg:w-96 h-auto drop-shadow-lg"
              preload
            />
          </div>
        </Container>
        <GrassBlob className="w-full h-10 sm:h-14 -mb-1" />
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

      {/* Real class photo */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading font-extrabold text-3xl text-brown">
              See Soccer Cubs in action
            </h2>
            <p className="mt-3 text-brown-soft">
              Real cubs, real classes &mdash; dribbling, giggling, and
              learning to love the game.
            </p>
          </div>
          <div className="rounded-[2rem] overflow-hidden border-2 border-brown/10 shadow-sm">
            <Image
              src="/images/photos/class-action-1.jpg"
              alt="Kids dribbling soccer balls during a Soccer Cubs class"
              width={2000}
              height={1125}
              className="w-full h-auto"
            />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 bg-cream-dark">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-brown">
              Signing up takes about 2 minutes
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {STEPS.map(({ step, title, body }) => (
              <div key={step} className="text-center px-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-orange text-white font-heading font-extrabold text-xl flex items-center justify-center">
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
