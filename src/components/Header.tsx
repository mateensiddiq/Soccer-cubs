"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import Container from "./Container";
import { ButtonLink } from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/program", label: "Program" },
  { href: "/about", label: "About the Coach" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-brown/10 bg-cream/85 backdrop-blur-md">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/brand/cub.png"
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            preload
          />
          <Image
            src="/images/brand/wordmark.png"
            alt="Soccer Cubs"
            width={780}
            height={320}
            className="h-9 sm:h-10 w-auto"
            preload
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-2 rounded-full font-semibold text-sm transition-colors hover:text-action ${
                  active ? "text-action" : "text-brown-soft"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-orange transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
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
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-brown/15 bg-white text-brown transition-colors hover:border-action hover:text-action"
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-brown/10 bg-cream">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 rounded-2xl font-semibold ${
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
