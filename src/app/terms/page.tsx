import type { Metadata } from "next";
import LegalPage, { type LegalSectionData } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Soccer Cubs",
  description:
    "The terms for using the Soccer Cubs website and enrolling your child: classes, billing, cancellations, freezes, safety, and more.",
};

const SECTIONS: LegalSectionData[] = [
  {
    id: "about",
    title: "About Soccer Cubs",
    body: (
      <p>
        Soccer Cubs provides on-site soccer classes at partner daycares across
        Northern Virginia. Classes are led by Coach Mateen Siddiq and are
        designed for children ages 2 and up.
      </p>
    ),
  },
  {
    id: "who-can-enroll",
    title: "Who can enroll",
    body: (
      <>
        <p>
          You must be a parent or legal guardian, at least 18 years old, with
          the authority to enroll your child. You agree that the information
          you give us is accurate and that you&apos;ll keep it up to date,
          especially your contact details, emergency contacts, and any
          allergy or health information.
        </p>
      </>
    ),
  },
  {
    id: "classes",
    title: "Classes and scheduling",
    body: (
      <>
        <p>
          Classes take place at your child&apos;s daycare on the day and time
          shown for that location when you sign up. Children are generally
          grouped by age, with 2 and 3-year-olds together and 4 and 5-year-olds
          together, and we may mix ages when skill levels are close.
        </p>
        <ul>
          <li>
            <strong>Bad weather.</strong> If it&apos;s raining or too cold to
            play outside, we&apos;ll move class indoors whenever the school
            can accommodate it. When that isn&apos;t possible, we&apos;ll make
            up the class later that same week or the following week on a
            different day.
          </li>
          <li>
            <strong>If we miss a class.</strong> If we&apos;re ever unable to
            come to your school for a scheduled class, we&apos;ll offer a
            makeup class.
          </li>
          <li>
            <strong>If your child misses a class.</strong> Missed classes are
            the family&apos;s responsibility. We can&apos;t offer makeups for
            absences due to illness, vacation, or other reasons.
          </li>
          <li>
            <strong>Summer.</strong> We run classes through the summer as long
            as enough children are enrolled at that location to hold one.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "monthly-billing",
    title: "Monthly memberships and billing",
    body: (
      <>
        <p>
          At most locations, enrolling starts a monthly membership. The price
          is shown at sign-up, before you pay. Your membership renews
          automatically every month and is charged to the payment method you
          provide, through Stripe, until you cancel. Billing runs year-round
          and is not paused for holidays.
        </p>
        <p>
          <strong>Joining in the middle of a month.</strong> How much you pay
          for your first, partial month depends on when you sign up:
        </p>
        <ul>
          <li>
            Sign up on or before the 17th and you&apos;re charged the full
            monthly price right away.
          </li>
          <li>
            Sign up on or after the 18th and you pay half the monthly price
            for that first, partial month.
          </li>
          <li>
            Sign up on or after the 25th and the rest of that month is free.
          </li>
        </ul>
        <p>
          In every case your child is welcome at any class for the rest of the
          month you join, and billing moves to the full monthly price starting
          on the 1st of the following month. Some locations may set a later
          first billing date. If so, we show it at sign-up, and you won&apos;t
          be charged before then.
        </p>
      </>
    ),
  },
  {
    id: "session-payments",
    title: "Session and full-year payments",
    body: (
      <>
        <p>
          Some locations run in sessions with set dates instead of a monthly
          membership. There you can pay for one session or, where offered, for
          the full year. These are one-time payments for the dates and number
          of classes shown at sign-up. They do not renew automatically, and
          you&apos;ll need to enroll again for later sessions.
        </p>
        <p>
          Session and full-year payments are not refundable once the session
          has started, including for absences. If you need to withdraw before
          a session begins, contact us and we&apos;ll work with you. If we
          cancel a scheduled class, we&apos;ll offer a makeup as described
          above.
        </p>
      </>
    ),
  },
  {
    id: "cancel-and-freeze",
    title: "Canceling and freezing a membership",
    body: (
      <>
        <p>
          <strong>Canceling.</strong> You can cancel any time from the{" "}
          <a href="/billing">Manage My Subscription</a> page. Enter your email
          and we&apos;ll send you a secure link. Cancel before your next
          monthly payment is charged. Cancellation takes effect at the end of
          the period you&apos;ve already paid for, so your child keeps
          attending until then. Once a monthly charge has gone through, your
          child is enrolled for that month and we can&apos;t cancel or refund
          it.
        </p>
        <p>
          <strong>Freezing.</strong> If you&apos;re traveling or need a break,
          you can freeze your membership for 1 or 2 months from the same
          page. You won&apos;t be charged while it&apos;s frozen, and billing
          resumes automatically when the freeze ends.
        </p>
      </>
    ),
  },
  {
    id: "failed-payments",
    title: "Failed payments",
    body: (
      <p>
        If a payment doesn&apos;t go through, Stripe may try the charge again
        and we&apos;ll contact you so you can update your payment method. We
        may pause your child&apos;s participation until the balance is paid.
        You are responsible for any fees your bank or card issuer charges.
      </p>
    ),
  },
  {
    id: "health-and-safety",
    title: "Health, safety, and emergencies",
    body: (
      <>
        <p>
          Please tell us about any allergy, medical condition, or need that
          could affect your child in class, either in the notes on the sign-up
          form or through our <a href="/contact">contact page</a>. Keep your
          emergency contacts current.
        </p>
        <p>
          If a child is hurt or becomes seriously unwell during class, we will
          contact a parent or the emergency contacts on file. In an emergency
          we may also call emergency services.
        </p>
      </>
    ),
  },
  {
    id: "assumption-of-risk",
    title: "Assumption of risk",
    body: (
      <p>
        Soccer is physical activity, and even carefully run classes for young
        children carry some risk of falls, collisions, and minor injuries. By
        enrolling your child you acknowledge these inherent risks and accept
        them on your child&apos;s behalf. This does not waive any right that
        cannot be waived under Virginia law.
      </p>
    ),
  },
  {
    id: "using-the-website",
    title: "Using the website",
    body: (
      <p>
        Please use the site only for its intended purpose: learning about
        Soccer Cubs, enrolling, and contacting us. Don&apos;t try to disrupt
        it, access areas you aren&apos;t authorized to use, or send automated
        or abusive submissions. The Soccer Cubs name, logo, photos, and text
        belong to Soccer Cubs, and you may not reuse them without our
        permission.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and limits on liability",
    body: (
      <p>
        The website is provided &ldquo;as is.&rdquo; To the fullest extent the
        law allows, Soccer Cubs is not liable for indirect or consequential
        losses, and our total liability for any claim relating to the website
        or our classes is limited to the amount you paid us in the 12 months
        before the claim. Nothing in these terms limits liability that the law
        does not allow to be limited.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Your information",
    body: (
      <p>
        How we collect, use, and protect your and your child&apos;s
        information is described in our <a href="/privacy">Privacy Policy</a>,
        which is part of these terms.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. We&apos;ll change the date
        at the top of this page and, for significant changes, email the
        parents of enrolled children. Changes apply going forward. Continuing
        to use the site or keeping your child enrolled after a change means you
        accept the updated terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the Commonwealth of Virginia,
        without regard to its conflict-of-laws rules. Any dispute will be
        handled in the state or federal courts located in Virginia.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:joinsoccercubs@gmail.com">joinsoccercubs@gmail.com</a>{" "}
        or use our <a href="/contact">contact page</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The ground rules for classes, billing, and using our website."
      updated="September 19, 2026"
      intro={
        <p>
          These terms apply when you use joinsoccercubs.com or enroll your
          child in Soccer Cubs classes. By signing up or using the site, you
          agree to them. In these terms, &ldquo;we&rdquo; and &ldquo;us&rdquo;
          mean Soccer Cubs, and &ldquo;you&rdquo; means the parent or guardian
          enrolling a child.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
