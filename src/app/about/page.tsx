import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

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
              <div className="mx-auto sm:mx-0 h-48 w-48 rounded-full border-4 border-white shadow-md overflow-hidden">
                <Image
                  src="/images/brand/coach-mateen.jpg"
                  alt="Coach Mateen"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
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
        </Container>
      </section>
    </div>
  );
}
