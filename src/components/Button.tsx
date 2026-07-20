import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-orange text-white hover:bg-orange-dark shadow-[0_4px_0_0_var(--color-orange-dark)] hover:shadow-[0_2px_0_0_var(--color-orange-dark)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none",
  secondary:
    "bg-yellow text-brown hover:bg-yellow-soft shadow-[0_4px_0_0_var(--color-orange-dark)] hover:shadow-[0_2px_0_0_var(--color-orange-dark)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none",
  outline:
    "bg-white text-brown border-2 border-brown/15 hover:border-orange hover:text-orange",
  ghost: "bg-transparent text-brown hover:bg-cream-dark",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold px-6 py-3 text-base transition-all duration-150 whitespace-nowrap";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none cursor-pointer ${className}`}
      {...props}
    />
  );
}
