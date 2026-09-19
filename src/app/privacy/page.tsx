import type { Metadata } from "next";
import LegalPage, { type LegalSectionData } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Soccer Cubs",
  description:
    "What information Soccer Cubs collects when you visit our website or enroll your child, how we use and protect it, and the choices you have.",
};

const SECTIONS: LegalSectionData[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          <strong>When you enroll your child.</strong> The sign-up form asks
          for:
        </p>
        <ul>
          <li>
            <strong>Your child:</strong> name, date of birth, home address,
            the class group or session you choose, and any notes you decide
            to share, such as allergies or health information.
          </li>
          <li>
            <strong>Parents or guardians:</strong> your name, email address,
            and phone number, plus a second parent&apos;s name and phone
            number if you choose to add one.
          </li>
          <li>
            <strong>Emergency contacts:</strong> the names and phone numbers
            of up to two people other than the parents. Please only list
            someone who has agreed to be contacted.
          </li>
        </ul>
        <p>
          <strong>Payment information.</strong> Payments are collected on
          Stripe&apos;s secure checkout page. Your card number never passes
          through our website and we never see or store it. We keep the
          identifiers Stripe gives us (a customer ID and a subscription or
          payment ID) and whether your account is active, past due, paused,
          or canceled.
        </p>
        <p>
          <strong>When you contact us.</strong> The contact and birthday/event
          forms collect your name, email address, phone number (optional),
          event date (birthday inquiries only), and whatever you write in your
          message.
        </p>
        <p>
          <strong>Automatically, when you visit the site.</strong> We use
          Vercel Web Analytics to understand which pages are visited. It
          records things like the page viewed, the site that referred you,
          your browser and device type, and your approximate location
          (country or region). It does not use cookies and does not follow you
          across other websites. Our hosting provider also keeps standard
          server logs, such as IP address, time, and pages requested, for
          security and reliability.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          We do not use advertising cookies or cross-site tracking cookies.
          The only cookie our website sets is a sign-in cookie used by Coach
          Mateen to open the private class roster. Visitors and parents never
          receive it.
        </p>
        <p>
          When you pay, you&apos;ll be on a page hosted by Stripe, which may
          set its own cookies for fraud prevention and to remember your
          checkout. Those are governed by Stripe&apos;s privacy policy.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: (
      <>
        <p>We use the information above to:</p>
        <ul>
          <li>Enroll your child and place them in the right class.</li>
          <li>
            Run classes safely, including knowing about allergies and health
            notes you shared and being able to reach you or an emergency
            contact.
          </li>
          <li>
            Bill you, manage your subscription or payment, and answer
            questions about charges.
          </li>
          <li>
            Send you emails about your enrollment: a confirmation when you
            sign up, a welcome email before your child&apos;s first class,
            billing and freeze or cancellation notices, and secure links to
            manage your subscription.
          </li>
          <li>
            Send occasional updates about your child&apos;s class, such as
            news and photos from recent sessions.
          </li>
          <li>Respond to messages and event inquiries.</li>
          <li>Protect the site from spam, fraud, and misuse.</li>
          <li>Meet legal, tax, and accounting obligations.</li>
        </ul>
        <p>
          Enrollment and billing emails are part of providing the service. You
          can ask us to stop sending class updates at any time and we will,
          though we&apos;ll still send messages about your account and
          payments.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          <strong>We do not sell or rent your personal information, and we do
          not share it for advertising.</strong> We share it only in these
          limited ways:
        </p>
        <ul>
          <li>
            <strong>Service providers that help us operate.</strong> Stripe
            processes payments. Supabase hosts the database where enrollment
            records are stored. Resend delivers our emails. Vercel hosts the
            website and provides the analytics described above. Each may
            handle your information only to provide its service to us.
          </li>
          <li>
            <strong>The daycare where your child&apos;s class is held.</strong>{" "}
            Where needed to run a class, such as confirming which children
            attend, we may share a child&apos;s name and class time with that
            daycare.
          </li>
          <li>
            <strong>When the law requires it,</strong> or when we believe it
            is necessary to protect the safety of a child or others.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's privacy",
    body: (
      <>
        <p>
          Our website is meant for parents and guardians. Children do not use
          it, create accounts, or submit information themselves. We collect
          information about a child only from that child&apos;s parent or
          guardian, and only to enroll them and look after them in class.
        </p>
        <p>
          We do not knowingly collect personal information directly from
          children under 13. If you believe a child has sent us information
          directly, contact us and we will delete it. Parents can review,
          correct, or delete their child&apos;s information at any time; see
          &ldquo;Your choices&rdquo; below.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <>
        <p>
          The website is served over HTTPS. Enrollment records are stored in a
          database that cannot be reached from a web browser and is accessed
          only by our own servers. The class roster, which shows children&apos;s
          details, sits behind a private login that only we use. Payments are
          handled by Stripe, a PCI-compliant processor.
        </p>
        <p>
          No system is perfectly secure, so we cannot guarantee absolute
          security. If a breach ever affects your information, we will notify
          you as the law requires.
        </p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <p>
        We keep enrollment information while your child is enrolled and for a
        reasonable time afterward to handle billing questions and meet
        accounting, tax, and safety obligations. After that we delete it or
        remove the details that identify you. We keep messages you send us for
        as long as we need them to respond and for our records.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>Tell you what information we have about you and your child.</li>
          <li>Correct anything that is wrong or out of date.</li>
          <li>
            Delete your information. If we delete a child&apos;s enrollment
            record we can no longer enroll them, and we may need to keep
            payment records that the law requires us to keep.
          </li>
          <li>Stop sending you class updates.</li>
        </ul>
        <p>
          Email us at{" "}
          <a href="mailto:joinsoccercubs@gmail.com">joinsoccercubs@gmail.com</a>{" "}
          and we&apos;ll respond as quickly as we can. You can also update
          your payment method, freeze, or cancel a membership yourself on the{" "}
          <a href="/billing">Manage My Subscription</a> page.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we change this policy, we&apos;ll update the date at the top of this
        page. If the change is significant, we&apos;ll also email the parents
        of enrolled children.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy or your information? Email{" "}
        <a href="mailto:joinsoccercubs@gmail.com">joinsoccercubs@gmail.com</a>{" "}
        or use our <a href="/contact">contact page</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="What we collect, why we collect it, and how we look after it."
      updated="September 19, 2026"
      intro={
        <p>
          Soccer Cubs runs on-site youth soccer classes at daycares across
          Northern Virginia and is operated by Coach Mateen Siddiq. This policy
          explains what personal information we collect when you visit
          joinsoccercubs.com or enroll your child, and what we do with it. In
          this policy, &ldquo;we&rdquo; and &ldquo;us&rdquo; mean Soccer Cubs.
        </p>
      }
      summary={[
        "We collect only what we need to enroll your child, run class safely, and bill you.",
        "We never sell your information or use it for advertising.",
        "Your card number goes straight to Stripe. We never see or store it.",
        "Your child's details are kept in a private roster behind a login that only we use.",
        "You can ask to see, fix, or delete your information at any time.",
      ]}
      sections={SECTIONS}
    />
  );
}
