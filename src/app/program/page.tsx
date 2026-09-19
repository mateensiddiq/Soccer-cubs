import type { Metadata } from "next";
import Image from "next/image";
import { Check, HandHeart, UsersThree } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Program | Soccer Cubs",
  description:
    "What a Soccer Cubs class looks like: a typical class flow and the skills we build with kids ages 2 and up.",
};

const CLASS_FLOW = [
  {
    title: "Welcome & warm-up",
    body: "We start with a silly stretch or song to get wiggly bodies moving and excited.",
  },
  {
    title: "Learning the skill",
    body: "Coach Mateen breaks down one skill at a time — dribbling through cones, passing with a partner, or a fun new trick — in simple steps every cub can follow.",
  },
  {
    title: "Mini-game",
    body: "We turn the skill we just learned into a low-pressure game, so every cub gets to use what they practiced while having fun with friends.",
  },
  {
    title: "High fives & goodbyes",
    body: "We end with a group cheer and high fives all around, sending every cub off happy and excited for next week's class.",
  },
];

const SKILLS = [
  "Dribbling & ball control",
  "Balance & coordination",
  "Listening & following directions",
  "Sharing & taking turns",
  "Confidence moving in a group",
  "Basic passing & kicking",
];

export default function ProgramPage() {
  return (
    <div>
      <PageHero
        title="What a Soccer Cubs class looks like"
        subtitle="Every class is built around one big idea: little kids learn best when they're having fun. No drills, no pressure — just movement, games, and giggles."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid md:grid-cols-2 gap-10 md:gap-0 md:divide-x divide-brown/10 max-w-5xl">
          <div className="reveal md:pr-14">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-soft text-action">
              <UsersThree size={28} weight="duotone" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading font-extrabold text-2xl text-brown">
              How we group cubs
            </h2>
            <p className="mt-3 text-brown-soft leading-relaxed">
              Classes are generally grouped by age &mdash; 2 and 3-year-olds
              together, 4 and 5-year-olds together &mdash; so activities
              match where each cub is developmentally. If skill levels are
              close, we&apos;re happy to mix ages too.
            </p>
          </div>
          <div className="reveal md:pl-14">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-soft text-action">
              <HandHeart size={28} weight="duotone" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading font-extrabold text-2xl text-brown">
              One coach, all year
            </h2>
            <p className="mt-3 text-brown-soft leading-relaxed">
              Coach Mateen leads every single class himself &mdash; there&apos;s
              no rotating roster of instructors. Cubs get to grow comfortable
              with the same familiar face all year, instead of meeting
              someone new every few months.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="reveal lg:sticky lg:top-28">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-brown leading-[1.05]">
              A typical class
            </h2>
            <p className="mt-4 text-lg text-brown-soft max-w-lg">
              Classes run for about 30 minutes, right at your daycare, using
              soft training balls and gear sized for little feet.
            </p>
            <div className="mt-8 max-w-md overflow-hidden rounded-[2rem] border-4 border-white shadow-lift">
              <Image
                src="/images/photos/class-action-4.jpg"
                alt="Cubs in Soccer Cubs shirts passing and dribbling soccer balls together during class"
                width={1400}
                height={1400}
                sizes="(min-width: 1024px) 448px, 92vw"
                className="h-auto w-full"
              />
            </div>
          </div>

          <ol className="reveal relative">
            <div
              aria-hidden="true"
              className="absolute left-[1.6rem] top-8 bottom-8 w-px bg-orange/30"
            />
            {CLASS_FLOW.map((item, i) => (
              <li key={item.title} className="relative flex gap-5 pb-9 last:pb-0">
                <div className="relative z-10 flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-yellow font-heading font-extrabold text-xl text-brown ring-8 ring-cream">
                  {i + 1}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-heading font-bold text-xl text-brown">{item.title}</h3>
                  <p className="mt-1.5 text-brown-soft leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="reveal rounded-[2rem] bg-white border border-brown/10 shadow-soft px-6 py-12 sm:px-12 sm:py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brown">
                Skills we build along the way
              </h2>
              <p className="mt-4 text-lg text-brown-soft">
                Soccer is the fun part — but every class is quietly building
                skills that help on and off the field.
              </p>
            </div>
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 max-w-4xl mx-auto">
              {SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-3 font-bold text-brown">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-soft text-green-deep">
                    <Check size={16} weight="bold" aria-hidden="true" />
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
