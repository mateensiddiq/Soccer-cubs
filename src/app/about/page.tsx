import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "About the Coach | Soccer Cubs",
  description:
    "Meet the coach behind Soccer Cubs and why the program brings soccer straight to daycares in Northern Virginia.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero eyebrow="ABOUT" title="Meet your cub's coach" />

      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-start">
            <div>
              <div className="mx-auto sm:mx-0 h-48 w-48 rounded-full bg-yellow-soft border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/brand/cub.png"
                  alt="Soccer Cubs mascot"
                  width={160}
                  height={160}
                  className="h-32 w-32 object-contain"
                />
              </div>
              <p className="mt-2 text-center sm:text-left text-xs text-brown-soft/70">
                Real photo coming soon!
              </p>
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-brown">
                Hi, I&apos;m Coach Mateen 👋
              </h2>
              <p className="mt-4 text-brown-soft">
                I&apos;m Mateen Siddiq, a former semi-professional soccer
                player. I&apos;ve been coaching at Sugarland Learning Academy
                since 2019, working with kids as young as 2 (and as old as
                14) &mdash; and that&apos;s exactly where the idea for Soccer
                Cubs was born, years before it ever had a name.
              </p>
              <p className="mt-4 text-brown-soft">
                I&apos;m USSF D-licensed and SafeSport certified, because the
                families who trust me with their cubs deserve a coach who
                takes that seriously.
              </p>
              <p className="mt-4 text-brown-soft">
                What I love most is introducing this next generation of
                athletes to soccer in a way that sticks &mdash; building real
                motor skills and teamwork, while making sure every cub grows
                up with a genuinely great relationship with the game.
              </p>
              <p className="mt-4 text-brown-soft">
                Soccer Cubs is the result of years of doing this work before
                it ever became a business &mdash; built from real experience
                on the field, not a business plan.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-green-soft rounded-3xl p-8 text-center border-2 border-brown/10">
            <p className="font-heading font-bold text-xl text-brown">
              Want your cub in the next class?
            </p>
            <div className="mt-4">
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
