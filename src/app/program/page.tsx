import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { PawPrint, SoccerBall, SunBurst } from "@/components/illustrations";

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
        eyebrow="THE PROGRAM"
        title="What a Soccer Cubs class looks like"
        subtitle="Every class is built around one big idea: little kids learn best when they're having fun. No drills, no pressure — just movement, games, and giggles."
      />

      <section className="py-16">
        <Container className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm">
            <SoccerBall className="h-10 w-10" />
            <h2 className="mt-3 font-heading font-bold text-xl text-brown">
              How we group cubs
            </h2>
            <p className="mt-2 text-sm text-brown-soft">
              Classes are generally grouped by age &mdash; 2 and 3-year-olds
              together, 4 and 5-year-olds together &mdash; so activities
              match where each cub is developmentally. If skill levels are
              close, we&apos;re happy to mix ages too.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm">
            <PawPrint className="h-10 w-10 text-orange" />
            <h2 className="mt-3 font-heading font-bold text-xl text-brown">
              One coach, all year
            </h2>
            <p className="mt-2 text-sm text-brown-soft">
              Coach Mateen leads every single class himself &mdash; there&apos;s
              no rotating roster of instructors. Cubs get to grow comfortable
              with the same familiar face all year, instead of meeting
              someone new every few months.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-cream-dark">
        <Container>
          <h2 className="font-heading font-extrabold text-3xl text-brown text-center">
            A typical class
          </h2>
          <p className="mt-2 text-brown-soft text-center max-w-xl mx-auto">
            Classes run for about 30 minutes, right at your daycare, using
            soft training balls and gear sized for little feet.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLASS_FLOW.map((item, i) => (
              <div key={item.title} className="text-center px-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-yellow text-brown font-heading font-extrabold text-xl flex items-center justify-center border-2 border-brown/10">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-heading font-bold text-brown">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-brown-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SunBurst className="h-14 w-14" />
            <h2 className="mt-3 font-heading font-extrabold text-3xl text-brown">
              Skills we build along the way
            </h2>
            <p className="mt-3 text-brown-soft">
              Soccer is the fun part — but every class is quietly building
              skills that help on and off the field.
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm font-semibold text-brown"
                >
                  <PawPrint className="h-5 w-5 text-orange shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-soft rounded-[2.5rem] p-10 text-center border-2 border-brown/10">
            <p className="font-heading font-bold text-xl text-brown">
              Ready to sign your cub up?
            </p>
            <p className="mt-2 text-brown-soft text-sm">
              Pick your daycare location and see class days &amp; pricing in
              the sign-up flow.
            </p>
            <div className="mt-5">
              <ButtonLink href="/signup" variant="primary">
                Sign Up ⚽
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
