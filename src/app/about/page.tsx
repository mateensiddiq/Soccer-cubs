import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PlaceholderNote from "@/components/PlaceholderNote";
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
          <PlaceholderNote>
            swap this bio and photo for your own — this is just a
            realistic placeholder so the page isn&apos;t empty.
          </PlaceholderNote>

          <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-start">
            <div className="mx-auto sm:mx-0 h-48 w-48 rounded-full bg-yellow-soft border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
              <Image
                src="/images/brand/cub.png"
                alt="Coach headshot placeholder"
                width={160}
                height={160}
                className="h-32 w-32 object-contain"
              />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-brown">
                Hi, I&apos;m Coach [Your Name] 👋
              </h2>
              <p className="mt-4 text-brown-soft">
                I started Soccer Cubs because I wanted young kids to fall in
                love with movement before it ever felt like a &ldquo;sport&rdquo;
                &mdash; just running, kicking, laughing, and being part of a
                team of their peers. After coaching youth soccer for several
                years, I kept noticing the same thing: the earlier kids get
                comfortable being active in a group, the more confident they
                become everywhere else too.
              </p>
              <p className="mt-4 text-brown-soft">
                Soccer Cubs is my way of bringing that experience directly to
                daycares, so parents don&apos;t have to add one more
                after-work activity to the schedule &mdash; their cub gets to
                play soccer right where they already spend their day.
              </p>
              <p className="mt-4 text-brown-soft">
                Every class is designed around one goal: making sure every
                single kid, no matter their skill level, leaves smiling.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-cream-dark rounded-3xl p-8 text-center">
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
