import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "FAQ | Soccer Cubs",
  description:
    "Answers to common questions about Soccer Cubs classes, billing, and getting started — ages, weather policy, missed classes, cancellations, and more.",
};

type FaqItem = { question: string; answer: string };
type FaqGroup = { title: string; items: FaqItem[] };

const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What ages do you serve?",
        answer:
          "Soccer Cubs welcomes cubs starting at 2 years old, with classes designed to grow alongside your child as they get older.",
      },
      {
        question: "Can we try a class before signing up?",
        answer:
          "Yes! Reach out through our Contact page with your daycare and your child's name, and we'll do our best to get your cub into the next class for a trial.",
      },
      {
        question: "My daycare isn't a Soccer Cubs location yet — what can I do?",
        answer:
          "Refer us! Let us know your daycare's name and we'll reach out directly to the director to see if they'd like to bring Soccer Cubs on-site.",
      },
    ],
  },
  {
    title: "Classes",
    items: [
      {
        question: "What should my child wear?",
        answer:
          "Sneakers and comfortable athletic clothing. Every cub also receives a free Soccer Cubs t-shirt, which they're welcome to wear on class days.",
      },
      {
        question: "What happens if the weather is bad?",
        answer:
          "If it's raining or too cold to play outside, we'll move class indoors whenever the school is able to accommodate it. When that isn't possible, we'll make up the class later that same week or the following week on a different day.",
      },
      {
        question: "What if my child misses a class?",
        answer:
          "Missed classes are the family's responsibility — Soccer Cubs isn't able to offer makeups for absences due to illness or vacation. The one exception is on us: if we're ever unable to make it to your school for a scheduled class, we'll offer a makeup class.",
      },
    ],
  },
  {
    title: "Billing & Membership",
    items: [
      {
        question: "How does billing work if I sign up in the middle of the month?",
        answer:
          "It depends on when you sign up. Enroll on or before the 17th and you're billed the full monthly rate right away. Sign up on or after the 18th and you'll pay half price for that first, partial month. Sign up on or after the 25th and the rest of that month is free. Either way, your cub is welcome at any class for the remainder of the month you join, and billing moves to the full monthly rate starting the 1st of the following month.",
      },
      {
        question: "Do you bill through holidays and summer break?",
        answer:
          "Billing runs year-round and isn't paused for holidays. We also run classes through the summer, as long as enough cubs are enrolled at that location to hold one.",
      },
      {
        question: "Can I pause my membership if we're traveling?",
        answer:
          "Yes — head to the Manage My Subscription page (linked in the footer) and freeze your membership for 1 or 2 months. You won't be charged while frozen, and billing picks back up automatically once the freeze ends.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "Head to the Manage My Subscription page (linked in the footer) and enter your email for a secure link to your account. Just be sure to cancel before your next monthly payment is charged — once that charge goes through, your cub is enrolled for that month and we're not able to cancel or refund it.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything parents usually ask before their cub's first class."
      />

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-14">
            {FAQ_GROUPS.map((group) => (
              <div key={group.title}>
                <h2 className="font-heading font-extrabold text-3xl text-brown mb-5">
                  {group.title}
                </h2>
                <div className="divide-y divide-brown/10 border-y border-brown/10">
                  {group.items.map((item) => (
                    <details key={item.question} className="group py-1">
                      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 font-heading font-bold text-lg text-brown transition-colors hover:text-action [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <span
                          aria-hidden="true"
                          className="shrink-0 h-8 w-8 rounded-full bg-yellow-soft text-action flex items-center justify-center transition-transform duration-300 group-open:rotate-45"
                        >
                          <Plus size={16} weight="bold" />
                        </span>
                      </summary>
                      <p className="pb-5 pr-12 text-brown-soft leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[2rem] bg-yellow-soft px-8 py-9 sm:px-10">
            <div className="text-center sm:text-left">
              <h2 className="font-heading font-extrabold text-2xl text-brown">
                Still have questions?
              </h2>
              <p className="mt-1.5 text-brown-soft">
                We&apos;re happy to help — reach out and we&apos;ll get back to you.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" className="shrink-0">
              Contact Us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
