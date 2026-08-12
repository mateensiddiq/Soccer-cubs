"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { ButtonLink } from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/program", label: "Program" },
  { href: "/about", label: "About the Coach" },
  { href: "/for-daycares", label: "For Daycares" },
  { href: "/birthdays", label: "Birthdays & Events" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b-2 border-brown/10 shadow-sm">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/brand/cub.png"
            alt="Soccer Cubs mascot"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            preload
          />
          <span className="font-heading font-extrabold text-xl sm:text-2xl text-brown">
            Soccer Cubs
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-full font-semibold text-sm transition-colors hover:bg-cream-dark hover:text-orange ${
                pathname === link.href ? "text-orange" : "text-brown-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/signup"
            variant="primary"
            className="hidden sm:inline-flex !text-sm !py-2.5 !px-5"
          >
            Sign Up
          </ButtonLink>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border-2 border-brown/15 text-brown"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t-2 border-brown/10 bg-cream">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-xl font-semibold ${
                  pathname === link.href
                    ? "bg-yellow-soft text-brown"
                    : "text-brown-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink
              href="/signup"
              variant="primary"
              className="mt-2 sm:hidden"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
