import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { PawPrint, SoccerBall, SunBurst } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Our Program | Soccer Cubs",
  description:
    "What a Soccer Cubs class looks like: age groups, a typical class flow, and the skills we build with 2-6 year olds.",
};

const AGE_GROUPS = [
  {
    name: "Wobbly Cubs",
    ages: "~2–3 years",
    body: "Big movements, lots of songs, and getting comfortable being near a ball. Parent helpers and daycare staff nearby make this a gentle, playful intro.",
  },
  {
    name: "Little Cubs",
    ages: "~3–4 years",
    body: "Short games that build balance and coordination, first dribbling and kicking attempts, and learning to follow simple group instructions.",
  },
  {
    name: "Big Cubs",
    ages: "~5–6 years",
    body: "More structured mini-games, passing with a partner, taking turns, and the beginnings of teamwork and friendly competition.",
  },
];

const CLASS_FLOW = [
  {
    title: "Welcome & warm-up",
    body: "We start with a silly stretch or song to get wiggly bodies moving and excited.",
  },
  {
    title: "Skill of the day",
    body: "A simple, focused skill — like dribbling around cones or gentle passing — taught through games, not drills.",
  },
  {
    title: "Mini-game",
    body: "Everything comes together in a fun, low-pressure game where every cub touches the ball.",
  },
  {
    title: "Cool down & high fives",
    body: "We wrap up with a group cheer and celebrate every cub's effort, not just the goals.",
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
        <Container>
          <h2 className="font-heading font-extrabold text-3xl text-brown text-center">
            Age groups
          </h2>
          <p className="mt-2 text-brown-soft text-center max-w-xl mx-auto">
            Classes are grouped by age so every cub is playing at the right
            level. Right on the 2/3 border? We&apos;re happy to find the best fit.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {AGE_GROUPS.map((group) => (
              <div
                key={group.name}
                className="bg-white rounded-3xl p-6 border-2 border-brown/10 shadow-sm"
              >
                <SoccerBall className="h-10 w-10" />
                <h3 className="mt-3 font-heading font-bold text-lg text-brown">
                  {group.name}
                </h3>
                <p className="text-orange font-bold text-sm">{group.ages}</p>
                <p className="mt-2 text-sm text-brown-soft">{group.body}</p>
              </div>
            ))}
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
