import type { Metadata } from "next";
import Image from "next/image";
import { Medal, ShieldCheck, SoccerBall, CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About the Coach | Soccer Cubs",
  description:
    "Meet the coach behind Soccer Cubs and why the program brings soccer straight to daycares in Northern Virginia.",
};

const AT_A_GLANCE = [
  { label: "Former semi-professional player", icon: SoccerBall },
  { label: "Coaching kids since 2019", icon: CalendarCheck },
  { label: "USSF D-licensed", icon: Medal },
  { label: "SafeSport certified", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero title="Meet your cub's coach" />

      <section className="py-16 sm:py-24">
        <Container className="grid lg:grid-cols-[13rem_1fr] gap-10 lg:gap-16 items-start">
          <div className="reveal lg:sticky lg:top-28 mx-auto lg:mx-0 w-52 lg:w-full">
            <div className="overflow-hidden rounded-3xl border-4 border-white shadow-soft">
              <Image
                src="/images/brand/coach-mateen.jpg"
                alt="Coach Mateen"
                width={878}
                height={878}
                sizes="208px"
                className="h-auto w-full"
                preload
              />
            </div>
            <ul className="mt-6 grid gap-3">
              {AT_A_GLANCE.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-bold text-brown">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-soft text-green-deep">
                    <Icon size={20} weight="duotone" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal max-w-[65ch]">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brown leading-[1.1]">
              Hi, I&apos;m Coach Mateen
            </h2>
            <p className="mt-6 text-lg text-brown-soft leading-relaxed">
              I&apos;m Mateen Siddiq, a former semi-professional soccer
              player. I&apos;ve been coaching at Sugarland Learning Academy
              since 2019, working with kids as young as 2 (and as old as
              14), and that&apos;s exactly where the idea for Soccer
              Cubs was born, years before it ever had a name.
            </p>
            <p className="mt-5 text-lg text-brown-soft leading-relaxed">
              I&apos;m USSF D-licensed and SafeSport certified, because the
              families who trust me with their cubs deserve a coach who
              takes that seriously.
            </p>
            <p className="mt-5 text-lg text-brown-soft leading-relaxed">
              What I love most is introducing this next generation of
              athletes to soccer in a way that sticks, building real
              motor skills and teamwork, while making sure every cub grows
              up with a genuinely great relationship with the game.
            </p>
            <p className="mt-5 text-lg text-brown-soft leading-relaxed">
              Soccer Cubs is the result of years of doing this work before
              it ever became a business, built from real experience
              on the field, not a business plan.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
