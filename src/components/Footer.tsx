"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { ButtonLink } from "./Button";

const FOOTER_LINKS = [
  { href: "/program", label: "Program" },
  { href: "/about", label: "About the Coach" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/billing", label: "Manage My Subscription" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-brown-deep text-cream">
      <Container className="py-14 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/brand/cub.png"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
            />
            <Image
              src="/images/brand/wordmark.png"
              alt="Soccer Cubs"
              width={780}
              height={320}
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-4 text-sm text-cream/75 max-w-xs">
            Playful, coach-led soccer classes for ages 2 and up, brought
            right to daycares across Northern Virginia.
          </p>
        </div>

        <div>
          <p className="font-heading font-bold text-yellow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/80 hover:text-yellow font-semibold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading font-bold text-yellow mb-4">
            Ready to join in?
          </p>
          <p className="text-sm text-cream/75 mb-4">
            Sign up online in just a couple of minutes.
          </p>
          <ButtonLink href="/signup" variant="secondary" className="!py-2.5 !px-5">
            Sign Up
          </ButtonLink>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/65">
          <p>&copy; {new Date().getFullYear()} Soccer Cubs. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-yellow transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yellow transition-colors">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
