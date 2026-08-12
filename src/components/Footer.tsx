"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

const FOOTER_LINKS = [
  { href: "/program", label: "Program" },
  { href: "/about", label: "About the Coach" },
  { href: "/for-daycares", label: "For Daycares" },
  { href: "/birthdays", label: "Birthdays & Events" },
  { href: "/contact", label: "Contact" },
  { href: "/billing", label: "Manage My Subscription" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-yellow-soft border-t-2 border-brown/10 mt-16">
      <Container className="py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/brand/cub.png"
              alt="Soccer Cubs mascot"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-heading font-extrabold text-lg text-brown">
              Soccer Cubs
            </span>
          </div>
          <p className="mt-3 text-sm text-brown-soft max-w-xs">
            Playful, coach-led soccer classes for ages 2 and up, brought
            right to daycares across Northern Virginia.
          </p>
        </div>

        <div>
          <p className="font-heading font-bold text-brown mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-brown-soft hover:text-orange font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading font-bold text-brown mb-3">
            Ready to join in?
          </p>
          <p className="text-sm text-brown-soft mb-3">
            Sign up online in just a couple of minutes.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-orange text-white font-heading font-bold px-5 py-2.5 hover:bg-orange-dark transition-colors"
          >
            Sign Up ⚽
          </Link>
        </div>
      </Container>

      <div className="border-t border-brown/10">
        <Container className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brown-soft">
          <p>&copy; {new Date().getFullYear()} Soccer Cubs. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-orange">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
